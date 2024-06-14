# Understanding Transaction-Reverting Faults in Smart Contracts
This project aims to provide a benchmark for smart contract developers and researchers to enhance their understanding of transaction-reverting faults (TR faults) in smart contracts.
The project is associated with a paper titled <b>Understanding Transaction-Reverting Faults in Smart Contracts</b>.

(🌟<i>The paper is currently undergoing review and will be released in the near future</i>.)


## Dataset Description 
### Overview
We identify 301 real-world TR faults from open-source GitHub project and categorize them into machine auditable and machine unauditable faults. 
Among these faults, 224 (74.4%) fall into the machine auditable category, while the remaining 77 (25.6%) fall into the machine unauditable category. For detailed information on these 301 TR fault contracts, please refer to the `/contracts` folder.

### Folder Structure
The dataset is structured into four distinct sections within the `/contracts` directory:
+ [/machine_auditable_faults](/contracts/machine_auditable_faults): includes the buggy and patched version of the 224 machine auditable faults.
+ [/machine_unauditable_faults](/contracts/machine_unauditable_faults): includes the buggy and patched version of the 77 machine unauditable faults.
+ [/machine_auditable_faults.csv](/contracts/machine_auditable_faults.csv): contains the detailed information of each machine auditable fault, including the commit URL, category, and project type.
+ [/machine_unauditable_faults.csv](/contracts/machine_unauditable_faults.csv): contains the detailed information of each machine unauditable fault, including the commit URL, category, and project type.


## Security Analysis Tool Evaluation
### Tools
We select ten representive stat-of-the art security analysis tools for experiments. The ten tools are listed below:
* [ContractFuzzer](https://github.com/gongbell/ContractFuzzer)
* [sFuzz](https://github.com/duytai/sFuzz)
* [SmarTian](https://github.com/SoftSec-KAIST/Smartian)
* [Oyente](https://github.com/enzymefinance/oyente)
* [Mythril](https://github.com/ConsenSys/mythril)
* [Securify](https://github.com/eth-sri/securify)
* [Maian](https://github.com/ivicanikolicsg/MAIAN)
* [Manticore](https://github.com/trailofbits/manticore)
* [Slither](https://github.com/crytic/slither)
* [VeriSmart](https://github.com/kupl/VeriSmart-public)

### Experiment Setting
 
**The default setting of runtime parameters of each tool:**
|                | Trials | Timeout | Depth Limit |
|----------------|--------|---------|-------------|
| ContractFuzzer | 1      | 80h     | -           |
| sFuzz          | 3      | 2m      | -           |
| SmarTian       | 5      | 1h      | -          |
| Oyente         | -      | 30m     | 1,024       |
| Mythril        | -      | 24h     | 22          |
| Securify       | -      | -       | -           |
| Maian          | -      | 300s    | 60          |
| Manticore      | -      | 90m     | -           |
| Slither        | -      | 2m      | -           |
| VeriSmart      | -      | 30m     | -           |


### Experiment Result
The execution result for the ten tools are presented in `/results` folder.

**Summary of tool execution results:**
| **Tool**       | **Underflow/ Overflow** | **Unprotected Ether  Withdrawal** | **Unchecked Call  Return Value** | **Missing Zero  Address Check** | **Reentrancy** | **Vulnerability Detection Rate (VDR)** | **False Positive Rate (FPR)** |
|----------------|:-----------------------:|:---------------------------------:|:---------------------------------:|:-------------------------------:|:--------------:|:--------------------------------------:|:-----------------------------:|
| ContractFuzzer |            -            |                 -                 |                 -                 |                -                |        0       |              0/27（0.0%）              |           0/27(0.0%)          |
| sFuzz          |            0            |                 -                 |                 -                 |                -                |        0       |              0/94（0.0%）              |           0/94(0.0%)          |
| SmarTian       |            3            |                 2                 |                 -                 |                -                |        0       |              5/153（3.3%)              |          0/153(0.0%)          |
| Oyente         |            -            |                 -                 |                 -                 |                -                |        0       |               0/27(0.0%)               |           0/27(0.0%)          |
| Mythril        |            0            |                 0                 |                 0                 |                -                |        0       |               0/191(0/0%)              |          0/191(0.0%)          |
| Securify       |            -            |                 0                 |                 0                 |                -                |        -       |               0/97(0.0%)               |           0/97(0.0%)          |
| Maian          |            -            |                 0                 |                 -                 |                -                |        -       |               0/59(0.0%)               |           0/59(0.0%)          |
| Manticore      |            0            |                 0                 |                 0                 |                -                |        0       |               0/191(0.0%)              |          0/191(0.0%)          |
| Slither        |            -            |                 6                 |                 5                 |                5                |        8       |              24/157(15.3%)             |          4/157(2.5%)          |
| VeriSmart      |            0            |                 0                 |                 -                 |                -                |        -       |               0/126(0.0%)              |          0/126(0.0%)          |
| **Total**      |           3/67          |                8/59               |                5/38               |               5/33              |      8/27      |              29/224(12.9%)             |          4/224(1.8%)          |

For detailed information and analysis of the execution result of each tool, please refer to our paper. 
