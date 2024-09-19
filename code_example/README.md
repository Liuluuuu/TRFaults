# Machine Unauditable Fault Example
We provide real-world examples for each machine-unauditable fault not listed in the paper, along with their fixes and detailed descriptions. For other fault types, please refer to the paper.

## Asset availability check
In this lottery contract, the ```BuyTickets()``` function allows participants to purchase lottery tickets, and the total number of tickets is limited by a state variable ```maxTickets```. The fault lies in the original line 5, which uses a strict inequality (```<```) to check if the number of tickets a user wants to buy is less than the number of remaining tickets. This check fails for the scenario where the buyer purchases the exact remaining number of tickets, which should be a valid transaction. The fault is fixed in line 6 by changing the strict inequality to a less-than-or-equal-to (```<=```) comparison. Such that the scenario where a user purchases exactly the remaining number of tickets is valid and permitted. The fix enhances the contract's usability and ensures that all available tickets can be sold without leaving any surplus due to overly restrictive conditions.

```
contract Lottery {
    uint256 public constant maxTickets = 100;             
    function BuyTickets() public payable{
        uint256 numOfTicketsToBuy = msg.value / ticketPrice; 
-       require(numOfTicketsToBuy < RemainingTickets(), "Not enough tickets available.");
+       require(numOfTicketsToBuy <= RemainingTickets(), "Not enough tickets available.");  
        for (uint i = 0; i < numOfTicketsToBuy; i++){
            tickets.push(msg.sender); }}
    
    function RemainingTickets() public view returns(uint256){
        return maxTickets - tickets.length; }
}
```

## Configuration Check
This contact manages the distribution of tokens in an airdrop and allows for the remaining tokens to be claimed back by the owner before self-destructing the contract. The original contract lacks a mechanism to prevent the ```claim_rest_of_tokens_and_selfdestruct()``` function from being executed, which could be a risk if the airdrop has to be stopped or if there are any issues that need to be resolved before allowing the owner to claim the remaining tokens and self-destruct the contract. Thus, developers introduce a boolean flag ```cancelable``` to the contract, and a corresponding modifier ```isCancelable()```.
The ```cancelable``` flag is set in the constructor, allowing the contract deployer to decide whether the airdrop can be canceled.
The ```claim_rest_of_tokens_and_selfdestruct()``` function now includes the ```isCancelable()``` modifier, which checks if the contract is cancelable before proceeding.
This fix with the ```cancelable``` flag provides flexibility and control over the contract's termination. This is particularly useful in situations where the contract might need to remain active for a set period or until certain conditions are met, providing assurance to the token recipients that the airdrop will not be unexpectedly terminated. The addition of such a flag enhances the control over the contract lifecycle and increases trust in the airdrop process from the participants' perspective.

```
contract TokenAirdrop{
+   bool public cancelable;

+   modifier isCancelable() {
+       require(cancelable, 'forbidden action');
+       _;
+   }

-   constructor(address _tokenContract) public {
+   constructor(address _tokenContract, bool _cancelable) public {
        owner = msg.sender;
        tokenContract = MintableToken(_tokenContract);
+       cancelable = _cancelable;
    }

-   function claim_rest_of_tokens_and_selfdestruct() public {
+   function claim_rest_of_tokens_and_selfdestruct() public isCancelable {
        require(msg.sender == owner);
        require(tokenContract.balanceOf(address(this)) >= 0);
        require(tokenContract.transfer(owner, tokenContract.balanceOf(address(this))));
        selfdestruct(owner);
    }
}
```

## Consistency Check
This token swap contract interacts with a Uniswap V2 Router to facilitate token swaps between two tokens. The Uniswap V2 router enables users to directly exchange ERC20 tokens through automated liquidity pools, without the need for traditional market makers or order books. 
The ```estimateSwap()``` function is used to estimate the swap amount for a pair of tokens. The original contract assumes that the address stored in ```WETH``` aligns with the ```WETH``` address used by the router. If these addresses do not match, the contract may not function correctly as it would be using the wrong ```WETH``` address for swaps.
To fix the fault, developers introduce the ```checkWETH()``` function This function validates that the contract's ```WETH``` address matches the ```WETH``` address of the Uniswap router by calling ```router.WETH()```.
The ```checkWETH()``` function is then used as a prerequisite check in the ```estimateSwap()``` function to ensure that the addresses match before executing a swap.
This fix ensures the contract's internal reference to WETH  is consistent with the WETH used by the Uniswap router. This alignment is crucial for the contract to correctly estimate swaps and interact with the Uniswap protocol.
By preventing execution and reverting the transaction when there is a mismatch, the ```checkWETH()``` function safeguards the contract against using incorrect addresses, which could lead to loss of funds. It's a typical consistency check, ensuring that the contract's environment aligns with its expectations.

```
contract TokenSwap{
    address public immutable WETH;
    function estimateSwap(address beefyVault, address tokenIn) public view{
+       checkWETH();
        (, IUniswapV2Pair pair) = _getVaultPair(beefyVault);
        bool isInputA = pair.token0() == tokenIn;
        require(isInputA || pair.token1() == tokenIn, 'Input token not present in liquidity pair');        
        (uint256 reserveA, uint256 reserveB,) = pair.getReserves();
        (reserveA, reserveB) = isInputA ? (reserveA, reserveB) : (reserveB, reserveA);}

+   function checkWETH() public view returns (bool isValid) {
+       isValid = WETH == router.WETH();
+       require(isValid, 'WETH address not matching Router.WETH()');}
}
```

## Contract Account Validation
This decentralized exchange contract provides the functionality to create new exchange pairs between a base token and a data token.
The original contract lacks a mechanism to validate if the base token's address is a contract address. However, in decentralized finance (DeFi) applications, it's essential to ensure that tokens involved in swaps and other operations are smart contracts following token standards like ERC-20, not wallet addresses.
In the revised version, developers add the ```isContract()``` function to verify if an address is a contract account address. This is achieved by checking the size of the code at a particular address. In Ethereum, EOA (Externally Owned Account) addresses have no code and zero code size, while contract accounts have associated code, and the size is greater than zero.
Now, inside the ```createExchangePairs()``` function, there's a requirement that ```addresses[0]``` (the base token) must pass the ```isContract()``` check. By including the ```isContract()``` check, developers ensure that only legitimate contracts can be used as the base token in the exchange pair. This is crucial to prevent potential errors or attacks that could occur if a regular wallet address is used instead of a token contract. Such scenarios could result in tokens being unintentionally sent to a wallet address that cannot handle them correctly, locking the tokens and potentially leading to financial loss.

```
contract FixedRateExchange{
+   function isContract(address addr) public view returns(bool){
+    uint32 size;
+    assembly {size := extcodesize(addr)}
+     return (size > 0); }

    function createExchagePairs(address datatoken, address[] memory addresses) external onlyRouter returns (bytes32 exchangeId) {
        require(addresses[0] != address(0), "Invalid baseToken: zero address");
+       require(isContract(addresses[0]), "Invalid baseToken: EOA");
        require(datatoken != address(0), "Invalid datatoken: zero address");
        require(addresses[0] != datatoken, "Invalid datatoken: equals baseToken");   
        exchanges[exchangeId] = Exchange({
            datatoken: datatoken,
            baseToken: addresses[0]
        });}
}
```

## ID Uniqueness Violation
In this example, the contract manages a lottery system where participants can buy tickets with a unique set of numbers for each round. The ```buy()``` function allows users to purchase lottery tickets, with each ticket represented by an array of six numbers. The original contract did not include a validation check to ensure that the numbers within each ticket are unique. Without this check, a ticket could have multiple instances of the same number, which is not allowed according to the lottery rule. Therefore, developers add a nested loop structure to validate the uniqueness of the non-powerball numbers within each ticket. If any number is not unique, the ```require()``` statement reverts the transaction to prevent the purchase of an invalid ticket. Enforcing uniqueness is important for the integrity of the lottery system. It prevents any ambiguity in the draw and ensures that the odds of winning are consistent for all participants.

```
contract Powerball{
    struct Round {
        uint endTime;
        uint[6] winningNumbers;
        mapping(address => uint[6][]) tickets;
    }   
    uint public constant TICKET_PRICE = 2e15;
    uint public constant ROUND_LENGTH = 15 seconds;
    uint public round = 1;
    mapping(uint => Round) public rounds;

    function Powerball () public {
        rounds[round].endTime = now + ROUND_LENGTH;
    }
    
    function buy (uint[6][] numbers) payable public {
        require(numbers.length * TICKET_PRICE == msg.value);
        // Ensure the non-powerball numbers on each ticket are unique
+       for (uint k=0; k < numbers.length; k++) {
+           for (uint i=0; i < 4; i++) {
+               for (uint j=i+1; j < 5; j++) {
+                   require(numbers[k][i] != numbers[k][j]);
+               }
+           }
+       }
        // check for round expiry
        if (now > rounds[round].endTime) {
            round += 1;
            rounds[round].endTime = now + ROUND_LENGTH;
        }
        for (i=0; i < numbers.length; i++)
            rounds[round].tickets[msg.sender].push(numbers[i]);
    }
}
```

## Number Rounding Protection
In this tranche contract, it allows users to deposit an underlying token and in return, they receive interest and a different principal token, reflecting their share in the tranche.
The original ```preFundedDeposit()``` function may suffer from a rounding issue when calculating ```holdingsValue```, which represents the total value that the user's deposit holds. If the division in the calculation of ```holdingsValue```(```balanceBefore * usedUnderlying / shares```) does not divide evenly, the smart contract rounds the result, which can lead to ```valueSupplied``` being very marginally higher than the ```holdingsValue``` due to the loss of precision. In a strict comparison, this could cause transactions to fail even when the difference is inconsequential.
The developers address this by introducing a small tolerance (```+2```) to the ```require()``` statement to mitigate minor rounding errors when calculating the holding value. This allows for a small deviation between the ```valueSupplied``` and ```holdingsValue``` without reverting the transaction.

```
contract Tranche{
    uint128 public valueSupplied;    
    function prefundedDeposit(address _destination) public{
        (uint256 shares, uint256 usedUnderlying, uint256 balanceBefore) = position.prefundedDeposit(address(this));
        uint256 holdingsValue = (balanceBefore * usedUnderlying) / shares;
-       require(valueSupplied <= holdingsValue);
+       require(valueSupplied <= holdingsValue + 2);  //The +2 allows for very small rounding errors
        uint256 adjustedAmount;
        if (valueSupplied > 0 && holdingsValue > valueSupplied) {
            adjustedAmount = usedUnderlying - ((holdingsValue - valueSupplied) * usedUnderlying) / interestSupply;
        } else {
            adjustedAmount = usedUnderlying;}
        valueSupplied = uint128(valueSupplied + adjustedAmount);
        interestToken.mint(_destination, usedUnderlying);}
}
```

## Property Check for External Call
The contract is designed for a token bridge scenario where tokens from one network are locked in a contract and a corresponding amount is minted or unlocked on another network. The ```relayTokens()``` function is designed to relay tokens from a user to another contract while ensuring that the correct amount, after fees, is transferred.
In the original contract, there is no consideration for tokens that deduct a fee. If such a token is used, the amount received by the contract would be less than the ```_value``` specified, because the fee would be subtracted during the transfer.
To address this, the developers introduce a new check that accommodates the possibility of fee deduction. The ```balanceBefore``` variable captures the contract's token balance before the transfer, and ```balanceDiff``` is the difference after the transfer.
The new check ensures that the decrease in the contract's balance is not greater than the transferred value (```_value```). This is critical because the tokens are going to be locked or burned on the origin network, so the contract on the receiving end needs to account for the exact amount after the fee deduction.

```
contract MultiAMBErc20ToErc677{
    function relayTokens(ERC677 token, address receiver, uint256 _value) internal {
+       uint256 balanceBefore = token.balanceOf(address(this));
        setLock(true);
        token.transferFrom(msg.sender, address(this), _value);
        setLock(false);      
+       uint256 balanceDiff = token.balanceOf(address(this)).sub(balanceBefore);
+       require(balanceDiff <= _value);
-       bridgeActionsOnTokenTransfer(token, msg.sender, receiver, _value);
+       bridgeActionsOnTokenTransfer(token, msg.sender, receiver, balanceDiff);
    }
}
```

## Slippage Protection
In this vault contract, it allows users to deposit tokens to provide liquidity. The contract includes a ```provideLiquidity()``` function, which users call to deposit tokens into the Vault. In return, they are minted an equivalent number of ```eTokens```, which represent a claim on the deposited funds plus any returns generated from them.
In the original version of the contract, it lacks a check to ensure that the number of ```eTokens``` received is at least the minimum amount expected by the liquidity provider (```minOutputAmount```). This could lead to situations where users receive fewer ```eTokens``` than expected due to slippage or changes in the conversion rate between the time of initiating the transaction and its execution.
Developers address this issue by adding a ```require``` statement that checks if the number of ```eTokens``` to be received is greater than or equal to the ```minOutputAmount``` specified by the user. This is a common practice in DeFi platforms to protect users from slippage – a difference between the expected price of a trade and the price at which the trade is executed. Such a check is crucial for ensuring users' deposits are not undervalued due to market volatility or manipulation.

```
Contract Vault{
    uint256 public totalAmountDeposited = 0;
    uint256 internal constant RATIO_MULTIPLY_FACTOR = 10**6;
    function provideLiquidity(uint256 amount, uint256 minOutputAmount) external nonReentrant {
        require(amount > 0, 'Cannot stake zero token');
        uint256 receivedETokens = getNrOfETokensToMint(amount);
+       require (receivedETokens >= minOutputAmount, "Insufficient Output");
        totalAmountDeposited = amount + totalAmountDeposited;
        _mint(msg.sender, receivedETokens);
        require(stakedToken.transferFrom(msg.sender, address(this), amount));}
    
    function getNrOfETokensToMint(uint256 amount) internal view returns (uint256) {
        return (amount * RATIO_MULTIPLY_FACTOR) / (1 * RATIO_MULTIPLY_FACTOR);}
}
```

## Sufficient Balance Check
The example shows a typical sufficient balance check in a simple staking contract, where users can stake ERC20 tokens and earn rewards. The ```stakeTokens()``` function allows a user to deposit a specified amount of an ERC20 token into the contract. Upon staking, the user's balance is updated to reflect the new amount of staked tokens.
In the original contract, there is no check to ensure that the user has a sufficient balance of the ERC20 token they wish to stake. Without this check, the ```safeTransferFrom()``` call could fail if the user doesn't have enough tokens, which would lead to a revert of the transaction, wasting gas and potentially causing confusion.
The developers address it by adding a new ```require()``` statement to check that the amount to be staked is less than or equal to the token balance of the user. This ensures that the user cannot attempt to stake more tokens than they own, which would be an invalid operation.

```
contract BaseAccount{
    function executeTransaction(address _to, uint256 _value, uint256 _gasLimit, bytes memory _data) internal {
        // Require that there will be enough gas to complete the transaction
+       require(gasleft() > _gasLimit.mul(64).div(63).add(34700));
        (bool success, bytes memory res) = _to.call.gas(_gasLimit).value(_value)(_data);
        if (!success) {
            revert();
        }
    }
}
```

## Temporal Property Violation
The code snippet presents a simplified version of a voting contract.
This voting contract facilitates a voting system where proposals are created, voted on, and executed if certain conditions are met. It includes three main functions: ```createProposal```, ```vote```, and ```executeProposal```. 
The ```createProposal()``` function is designed for creating new proposals. The ```vote()``` function allows token holders from specified voting vaults to cast their votes on active proposals. If a proposal has sufficient votes and is valid (matches the proposal hash), the contract attempts to execute the proposal. These three functions reflect the temporal property of the contract and should be executed in sequence to align with a proposal's life cycle.
However, the original contract violates the temporal property of a proposal in the ```vote()``` function. It allows votes on non-existent proposals or on proposals that had already been executed or expired without checking of the ```created``` property.
To address this, developers add a new ```require()``` check to ensure that votes can only be cast on proposals that have been properly created. This prevents participants from interacting with proposals that have not been initialized or have been removed, which could potentially lead to unexpected outcomes or wasted gas if the function calls are made to non-existent proposals.
Thus, it maintains the integrity of the voting process, ensuring the contract's correct temporal property, and guarantees a fair and reliable governance mechanism.

```
contract Voting {
    function createProposal(bytes32 proposalHash) external {
        proposals[proposalCount] = Proposal(proposalHash, uint128(block.number - 1));
        proposalCount += 1;}

    function vote(uint128 votingPower, uint256 proposalId, Ballot ballot) public {
+       require(proposals[proposalId].created != 0, "Proposal does not exist");
        proposals[proposalId].votingPower += votingPower;}

    function executeProposal(uint256 proposalId, address[] memory targets, bytes[] memory calldata){
        for (uint256 i = 0; i < targets.length; i++) {
            (bool success,) = targets[i].call(calldata[i]);
            require(success, "Call failed");}
        delete proposals[proposalId];}
}
```

## Atomicity Violation
In this example, the ```FlashLoanProvider``` contract is designed to offer flash loans to users. It allows users to borrow tokens (```amount```) and expects them to return the loan within the same transaction, along with a fee (```flashFee```). The ```vault``` contract holds the funds and manages state related to a flash loan process, such as the ```isPaused flag.
The original contract lacks a mechanism to preserve the atomicity of a flash loan operation, such as ensuring no other calls to the vault are made until the current transaction is complete.
To address this, developers introduce a mutex locking mechanism by calling ```vault.lockVault()``` before processing the repayment and unlocking it afterward with ```vault.unlockVault()```. This ensures that the Vault contract is not re-enterable while the flash loan is being processed, thus preserving the atomicity of the operation.
Atomicity is at the core of flash loans. The entire transaction — loaning out funds, performing arbitrage, repaying the loan, etc. — must happen in one go. If any part of this operation is interrupted or re-entered maliciously, it could lead to insufficient funds offered to users or funds being drained from the contract. The mutex lock pattern is a common and effective way to guard against such issues.

```
contract FlashLoanProvider{
    function flashLoan(address receiver, address token, uint256 amount, bytes calldata data) {
        Vault vault = Vault(vaultFactory.tokenToVault(token));
        uint256 fee = _flashFee(token, amount); 
        require(vault.transferToAccount(address(receiver), amount));
+       vault.lockVault();
        require(ERC20(vault.Token()).transferFrom(address(receiver), address(vault), amount+fee));
+       vault.unlockVault();}
}

contract Vault{
    bool public isPaused = true;   
+   function lockVault() external {
+       require(isPaused == false, 'Vault already locked');
+       isPaused = true; }

+   function unlockVault() external {
+       require(isPaused == true, 'Vault already unlocked');
+       isPaused = false; }
}
```


## Others
This code snippet shows an example in the *Others* category. 
It adds ```require()``` checks to ensure the input parameters ```takerWants``` and ```takerGives``` need to conform to the ```uint160``` size limit, or the transaction fails. This form of validation is closely tied to the specific requirements of a contract's logic, presenting a challenge in distilling a broader, reusable pattern that could be applied across diverse contracts.

```
contract Snowflake{
    mapping (uint => mapping (address => uint)) public resolverAllowances;

    function changeResolverAllowances(uint ein, address[] memory resolvers, uint[] memory withdrawAllowances) private {
        require(resolvers.length == withdrawAllowances.length);
        for (uint i; i < resolvers.length; i++) {
            require(identityRegistry.isResolverFor(ein, resolvers[i]));
-           require(resolverAllowances[ein][resolvers[i]] == 0, "Allowance is not 0.");
            resolverAllowances[ein][resolvers[i]] = withdrawAllowances[i];
        }
    }
}
```
