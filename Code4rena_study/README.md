# Real-Word Study of Machine Unauditable Faults
To evaluate the potential usefulness of the identified fault types and fixing strategies in mitigating real-world security risks, we conduct a preliminary manual analysis of audit reports from [Code4rena](https://code4rena.com). 
Specifically, we use keywords that describe the features of machine unauditable faults, such as "manipulate states" and "incorrect transaction execution" for the temporal property violation fault type, to search relevant audit reports on Code4rena and identify machine unauditable fault cases. 
In total, we identify 29 real-world bugs that directly correspond to five of the machine unauditable fault types. 
For each fault type, we provide the search keyword and corresponding bug link. 

**We welcome additional suggestions or contributions to expand and improve the list.**

## Temporal Property Violation
**Search Keywords**: *unauthorized state transitions, manipulate states, double-spending, incorrect transaction execution, manipulation of state variables.*

**Bug list**: <br/>
*High Risk*: <br/>
https://github.com/code-423n4/2024-05-arbitrum-foundation-validation/issues/51 <br/>
https://github.com/code-423n4/2024-05-arbitrum-foundation-validation/issues/220 <br/>
https://github.com/code-423n4/2024-05-arbitrum-foundation-validation/issues/89 <br/>
https://github.com/code-423n4/2023-05-maia-findings/issues/645 <br/>
https://github.com/code-423n4/2024-02-althea-liquid-infrastructure-findings/issues/160 <br/>

*Med Risk*: <br/>
https://github.com/code-423n4/2021-12-nftx-findings/issues/105 <br/>
https://github.com/code-423n4/2024-05-munchables-validation/issues/292 <br/>

*Others*: <br/>
https://github.com/code-423n4/2022-06-nibbl-findings/issues/264 <br/>
https://github.com/code-423n4/2022-10-thegraph-findings/issues/293 <br/>

## Consistency Violation
**Search Keywords**: consistency, consistent, inconsistent 

**Bug list**: <br/>
*Med Risk*: <br/>
https://github.com/code-423n4/2021-04-marginswap-findings/issues/29 <br/>
https://github.com/code-423n4/2024-06-vultisig-validation/issues/143 <br/>
https://github.com/code-423n4/2024-05-munchables-validation/issues/81 <br/>

## Missing Account Type Verification
**Search Keywords**: account type, EOA 

**Bug list**: <br/>
*High Risk*: <br/>
https://github.com/code-423n4/2022-03-biconomy-findings/issues/55 <br/>

*Med Risk*: <br/>
https://github.com/code-423n4/2022-11-stakehouse-findings/issues/93 <br/>
https://github.com/code-423n4/2022-08-olympus-findings/issues/317 <br/>
https://github.com/code-423n4/2024-06-vultisig-validation/issues/625 <br/>
https://github.com/code-423n4/2022-01-dev-test-repo-findings/issues/377  <br/>
https://github.com/code-423n4/2024-06-vultisig-validation/issues/138 <br/>

*Others*: <br/>
https://github.com/code-423n4/2023-03-zksync-findings/issues/184 <br/>
https://github.com/code-423n4/2023-01-rabbithole-findings/issues/190 <br/>

## Insufficient Balance Validation
**Search Keywords**: token balance, balance of the contract, sufficient tokens/balances.

**Bug list**: <br/>
*Med Risk*: <br/>
https://github.com/code-423n4/2024-06-vultisig-validation/issues/105 <br/>
https://github.com/code-423n4/2024-06-badger-validation/issues/144 <br/>
https://github.com/code-423n4/2023-11-kelp-findings/issues/483 <br/>
https://github.com/code-423n4/2024-05-munchables-validation/issues/327 <br/>


## Excessive Slippage
**Search Keywords**: slippage

**Bug list**: <br/>
*High Risk*: <br/>
https://github.com/code-423n4/2024-06-vultisig-validation/issues/450 <br/>

*Med Risk*: <br/>
https://github.com/code-423n4/2024-06-vultisig-validation/issues/261 <br/>
https://github.com/code-423n4/2024-06-vultisig-validation/issues/339 <br/>
https://github.com/code-423n4/2024-06-vultisig-validation/issues/181 <br/>
https://github.com/code-423n4/2024-06-vultisig-validation/issues/217 <br/>
