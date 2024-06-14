# TR fault dataset
This project aims to provide a benchmark for smart contract developers and researchers to enhance their understanding of transaction-reverting faults (TR faults) in smart contracts.
The project is associated with a paper titled <b>Understanding Transaction-Reverting Faults in Smart Contracts</b>.

<i>(The paper is currently undergoing review and will be released in the near future:star:.)</i>


## Dataset description
### Dataset
We identify 301 real-world TR faults from open-source GitHub project and categorize them into machine auditable and machine unauditable faults. 
Together there are 224 (74.4%) machine auditable faults and 77(25.6%) machine auditable faults.
The 301 TR faults are availablae in `/dataset` folder. Detailed information about the 301 contract cases is presented in `TR_faults.xlsx`.


## Security Analysis Tool Evaluation
### Tools:
We select ten representive stat-of-the art sscurity analysis tools for experiments. The ten tools are listed below:
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

**Experiment Setting:**

*The default setting of runtime parameters:*
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


**Experiment Result:**

*The default setting of runtime parameters:*
| Tool           | TRS Omission | TRS Overuse | Improper TRS Conditions | Vulnerability Detection Rate |
|----------------|--------------|-------------|-------------------------|------------------------------|
| ContractFuzzer | 0/10         | -           | 0/4                     | 0/14 0.0%                    |
| sFuzz          | 4/18         | -           | 0/5                     | 4/23 17.45%                  |
| SmarTian       | 0/4          | 0/4         | 0/2                     | 0/10 0.0%                    |
| Oyente         | 0/3          | -           | 0/2                     | 0/5 0.0%                     |
| Mythril        | 2/57         | -           | 2/13                    | 4/70 5.7%                    |
| Maian          | 0/7          | -           | -                       | 0/7 0.0%                     |
| Manticore      | 1/31         | -           | 0/4                     | 1/35 2.9%                    |
| VeriSmart      | 0/7          | -           | 0/1                     | 0/8 0.0%                     |
| Securify       | 0/2          | -           | -                       | 0/2 0.0%                     |
| Slither        | 8/24         | -           | 2/4                     | 10/28 35.7%                  |
| Total          | 16/163       | 0/4         | 4/35                    | 20/202 10.0%                 |

**Note:** For more information, please refer to our [paper]().