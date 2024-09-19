# Understanding Transaction-Reverting Faults in Smart Contracts
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.11889080.svg)](https://doi.org/10.5281/zenodo.11889080)

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

Due to the upload size limit, we have solely included submodule links for accessing individual Github projects within our dataset. If you want to obtain the complete dataset, please refer to the Zenodo repository.

## Code Example
We list all the example code snippets for each machine-unauditable fault type in the `/code_example` directory. 
For each type, we include a real-world example (both buggy and patched versions), along with a detailed explanation of the fault type and the fixing strategy.

## Preliminary Study on Code4rera
To evaluate the potential usefulness of the identified fault types and fixing strategies in mitigating real-world security risks, we conduct a preliminary manual analysis of audit reports from [Code4rena](https://code4rena.com).
The result is presented in the `/Code4rena_study`.


## Security Analysis Tool Evaluation
### Tools
We select ten representive stat-of-the art security analysis tools for experiments. The ten tools are listed below:
* [sFuzz](https://github.com/duytai/sFuzz)
* [SmarTian](https://github.com/SoftSec-KAIST/Smartian)
* [Oyente](https://github.com/enzymefinance/oyente)
* [Mythril](https://github.com/ConsenSys/mythril)
* [Manticore](https://github.com/trailofbits/manticore)
* [Securify2](https://github.com/eth-sri/securify2)
* [Slither](https://github.com/crytic/slither)
* [SmartCheck](https://github.com/smartdec/smartcheck)
* [eTainter](https://github.com/DependableSystemsLab/eTainter)
* [MadMax](https://github.com/nevillegrech/MadMax)

### Experiment Setting
 
**The default setting of runtime parameters of each tool:**
|                | Trials | Timeout | Depth Limit |
|----------------|--------|---------|-------------|
| sFuzz          | 3      | 2m      | -           |
| SmarTian       | 5      | 1h      | -           |
| Oyente         | -      | 30m     | 1,024       |
| Mythril        | -      | 24h     | 22          |
| Manticore      | -      | 90m     | -           |
| Securify2      | -      | -       | -           |
| Slither        | -      | 2m      | -           |
| SmartCheck     | -      | -       | -           |
| eTainter       | -      | 5m      | -           |
| MadMax         | -      | 20s     | -           |


### Experiment Result
The execution result for the ten tools are presented in `/results` folder.

**Summary of tool execution results:**
| **Tool**   | **Integer Underflow/Overflow** | **Unprotected Ether Withdrawal** | **Unchecked Call Return Value** | **Missing Zero Address Check** | **Reentrancy** | **Insufficient Gas Validation** | **# False Positive** | Vulnerability Detection Rate | **False Positive Rate** |
|------------|:------------------------------:|:--------------------------------:|:-------------------------------:|:------------------------------:|:--------------:|:-------------------------------:|:--------------------:|:----------------------------:|:-----------------------:|
| sFuzz      |                0               |                 -                |                -                |                -               |        0       |                -                |           0          |             0.0%             |           0.0%          |
| SmarTian   |                3               |                 2                |                -                |                -               |        0       |                -                |           0          |             3.3%             |           0.0%          |
| Oyente     |                0               |                 0                |                -                |                -               |        0       |                -                |           0          |             0.0%             |           0.0%          |
| Mythril    |                0               |                 0                |                0                |                -               |        0       |                -                |           0          |             0.0%             |           0.0%          |
| Manticore  |                0               |                 0                |                0                |                -               |        0       |                -                |           0          |             0.0%             |           0.0%          |
| Securify2  |                0               |                 0                |                0                |                -               |        0       |                -                |           0          |             0.0%             |           0.0%          |
| Slither    |                -               |                 6                |                5                |                5               |        8       |                -                |           4          |             15.3%            |           2.5%          |
| SmartCheck |                0               |                 0                |                7                |                -               |        0       |                -                |           0          |             3.7%             |           0.0%          |
| eTianter   |                -               |                 -                |                -                |                -               |        -       |                0                |           0          |             0.0%             |           0.0%          |
| MadMax     |                -               |                 -                |                -                |                -               |        -       |                0                |           0          |             0.0%             |           0.0%          |
| **Total**  |              3/67              |               8/59               |              11/38              |              5/33              |      8/27      |               0/2               |           4          |             15.5%            |           1.8%          |


For detailed information and analysis of the execution result of each tool, please refer to our paper. 
