# Understanding State-Reverting Statements and State-Reverting Faults in Smart Contracts
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.11889080.svg)](https://doi.org/10.5281/zenodo.11889080)

This project aims to provide a benchmark for smart contract developers and researchers to enhance their understanding of  state-reverting statements (SR statements) and state-reverting faults (SR faults) in smart contracts.
The project is associated with a paper titled <b>On State Reverting in Solidity Smart Contracts: Developer Practices, Fault Categorization, and Tool Evaluation</b>.

(🌟<i>The paper is currently undergoing review and will be released in the near future</i>.)


## Dataset Description 
### Overview
We identify 320 real-world TR faults from open-source GitHub projects and Code4rena audit reports. We categorize these faults into 17 fault types and identify 12 distinct fixing strategies.
For detailed information about these SR faults, please refer to the `/GitHub_contracts` folder and the `/Code4rena_study` folder.

### GitHub SR faults
The GitHub SR fault dataset is structured into two distinct sections within the `/GitHub_contracts` directory:
+ [/SRfaults](/contracts/machine_auditable_faults): includes the buggy and patched version of the 278 SR faults from GitHub.
+ [/SRfaults_Github.csv](/contracts/machine_auditable_faults.csv): contains the detailed information of each SR fault, including the commit URL, category, and project type.

Due to the upload size limit, we have solely included submodule links for accessing individual Github projects within our dataset. If you want to obtain the complete dataset, please refer to the Zenodo repository.

## Code Example
We list all the example code snippets for each SR fault type in the `/code_example` directory. 
For each type, we include a real-world example (both buggy and patched versions), along with a detailed explanation of the fault type and the fixing strategy.

## Preliminary Study on Code4rera
To evaluate the relevance and security impact of the identified fault types and fixing strategies in mitigating real-world security risks, we conduct a preliminary manual analysis of audit reports from [Code4rena](https://code4rena.com).
The result is presented in the `/Code4rena_study`.


## Security Analysis Tool Evaluation
### Tools
We select 12 representative security analysis tools for experiments. The 12 tools are listed below:
* [ContractFuzzer](https://github.com/duytai/sFuzz](https://github.com/gongbell/ContractFuzzer))
* [sFuzz](https://github.com/duytai/sFuzz)
* [SmarTian](https://github.com/SoftSec-KAIST/Smartian)
* [Oyente](https://github.com/enzymefinance/oyente)
* [Mythril](https://github.com/ConsenSys/mythril)
* [Maian](https://github.com/ivicanikolicsg/MAIAN) 
* [Manticore](https://github.com/trailofbits/manticore)
* [VeriSmart](https://github.com/kupl/VeriSmart-public)
* [Securify2](https://github.com/eth-sri/securify2)
* [SmartCheck](https://github.com/smartdec/smartcheck)
* [Slither](https://github.com/crytic/slither)
* [GPTScan](https://github.com/GPTScan/GPTScan)

### Experiment Setting
 
**The default setting of runtime parameters of each tool:**
|                | Trials | Timeout | Depth Limit |
|----------------|--------|---------|-------------|
| ContractFuzzer | 1      | 80h     | -           |
| sFuzz          | 3      | 2m      | -           |
| SmarTian       | 5      | 1h      | -           |
| Oyente         | -      | 30m     | 1,024       |
| Mythril        | -      | 24h     | 22          |
| Maian          | -      | 300s    | 60          |
| Manticore      | -      | 90m     | -           |
| VeriSmart      | -      | 30m     | -           |
| Securify2      | -      | -       | -           |
| SmartCheck     | -      | -       | -           |
| Slither        | -      | 2m      | -           |
| GPTScan        | 5      | -       | -           |


### Experiment Result
The execution result for the ten tools are presented in `/results` folder.

**Summary of tool execution results:**
 | **Tool**   | **Integer Underflow/Overflow** | **Unprotected Ether Withdrawal** | **Unchecked Call Return Value** | **Missing Zero Address Check** | **Reentrancy** | **Excessive Slippage** | **# False Positive** | Vulnerability Detection Rate | **False Positive Rate** |
|------------|:------------------------------:|:--------------------------------:|:-------------------------------:|:------------------------------:|:--------------:|:-------------------------------:|:--------------------:|:----------------------------:|:-----------------------:|
| ContractFuzzer    |                -               |                 -                |                -                |                -               |        0       |                -                |           0          |             0.0%             |           0.0%          |
| sFuzz      |                0               |                 -                |                -                |                -               |        0       |                -                |           0          |             0.0%             |           0.0%          |
| SmarTian   |                3               |                 2                |                -                |                -               |        0       |                -                |           0          |             3.3%             |           0.0%          |
| Oyente     |                0               |                 0                |                -                |                -               |        0       |                -                |           0          |             0.0%             |           0.0%          |
| Mythril    |                0               |                 0                |                0                |                -               |        0       |                -                |           0          |             0.0%             |           0.0%          |
| Manticore  |                0               |                 0                |                0                |                -               |        0       |                -                |           0          |             0.0%             |           0.0%          |
| VeriSmart  |                0               |                 0                |                -                |                -               |        -       |                -                |           0          |             0.0%             |           0.0%          |
| Securify2  |                0               |                 0                |                0                |                -               |        0       |                -                |           0          |             0.0%             |           0.0%          |
| SmartCheck |                0               |                 0                |                7                |                -               |        0       |                -                |           0          |             3.7%             |           0.0%          |
| Slither    |                -               |                 6                |                5                |                5               |        8       |                -                |           4          |             15.3%            |           2.5%          |
| GPTScan   |                -               |                 -                |                -                |                -               |        -       |                -                |           0          |             0.0%             |           0.0%          |
| **Total**  |              3/67              |               8/59               |              11/38              |              5/33              |      8/27      |               0/19               |           4          |             14.4%            |           1.6%          |


For detailed information and analysis of the execution result of each tool, please refer to our paper. 
