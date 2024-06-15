import requests
import os
import shutil
import openpyxl
import pandas as pd
import zipfile
from pathlib import Path
import subprocess

def download_repo_snapshot(repo_url, commit_sha, destination_path):
    headers = {}
    

    snapshot_before_url = f'{repo_url}/zipball/{commit_sha}^'
    response_before = requests.get(snapshot_before_url, headers=headers, stream=True)
    
    if response_before.status_code == 200:
        snapshot_before_path = os.path.join(destination_path, 'buggy_version.zip')
        with open(snapshot_before_path, 'wb') as file:
            shutil.copyfileobj(response_before.raw, file)
        print(f'Snapshot before commit saved to: {snapshot_before_path}')
    else:
        print('Unable to download snapshot before commit.')


    snapshot_after_url = f'{repo_url}/zipball/{commit_sha}'
    response_after = requests.get(snapshot_after_url, headers=headers, stream=True)
    
    if response_after.status_code == 200:
        snapshot_after_path = os.path.join(destination_path, 'patched_version.zip')
        with open(snapshot_after_path, 'wb') as file:
            shutil.copyfileobj(response_after.raw, file)
        print(f'Snapshot after commit saved to: {snapshot_after_path}')
    else:
        print('Unable to download snapshot after commit.')

def get_info(url):
    segment = url.split('/')
    repo_owner = segment[3]
    repo_name = segment[4]
    commit_sha = segment[6]

    return repo_owner, repo_name, commit_sha

def unzip(zip_file, extract_to):
    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        zip_ref.extractall(extract_to)

def unzip_files(data_path):
    
    zip_files = list(Path(data_path).rglob('*.zip'))
    for file in zip_files:
        print('unzipping file ', file, '......')
        save_dir = file.parent/file.name.split('.')[0]
        if not os.path.exists(save_dir):
            os.mkdir(save_dir)
        try:
            unzip(file, save_dir)
        except:
            print(file," failed!")

def delete_files(data_path):
    zip_files = list(Path(data_path).rglob('*.zip'))
    for file in zip_files:
        try:
            os.remove(file)
        except:
            print("delete error")

def get_size(path):
    folders = Path(path).iterdir()
    for folder in folders:
        r_list = cal_size(folder, [])
        print(folder,":",sum(r_list)*0.0000009537,"MB")

    # return os.path.getsize(path)


def cal_size(path, list1):
    # list1 =[]
    fileList = os.listdir(path)  # 获取path目录下所有文件
    for filename in fileList:
        pathTmp = os.path.join(path,filename)  # 获取path与filename组合后的路径
        if os.path.isdir(pathTmp):   # 判断是否为目录
            list1 = cal_size(pathTmp, list1=list1)        # 是目录就继续递归查找
        elif os.path.isfile(pathTmp):  # 判断是否为文件
            filesize = os.path.getsize(pathTmp)  # 如果是文件，则获取相应文件的大小
            list1.append(filesize)
    
    return (list1)


def get_parent_sha(repo_url, commit_sha):
    headers = {}

    snapshot_url = f'{repo_url}/commits/{commit_sha}'
    response = requests.get(snapshot_url, headers=headers, stream=True)
    
    if response.status_code == 200:
        return response.json()["parents"][0]["sha"]
        # print(len(response.json()["parents"]))

def add_submodule(url, path, name):
    os.system(f"git submodule add {url} {path}/buggy_version/{name}")
    os.system(f"git submodule add {url} {path}/patched_version/{name}")
    

def set_checkpoint(buggy_sha, patched_sha, path, name):
    os.chdir(f"{path}/buggy_version/{name}")
    # os.system("ls")
    os.system(f"git checkout {buggy_sha}")
    os.chdir("../../../../..")

    os.chdir(f"{path}/patched_version/{name}")
    os.system(f"git checkout {patched_sha}")
    os.chdir("../../../../..")


    # result_b = subprocess.run([f"git checkout {buggy_sha}"], cwd=f"{path}/buggy_version/{name}", shell=False)
    # print("stdout:", result_b.stdout)
    # print("stderr:", result_b.stderr)
    
    # result_p = subprocess.run([f"git checkout {patched_sha}"], cwd=f"{path}/patched_version/{name}", shell=False)
    # print("stdout:", result_p.stdout)
    # print("stderr:", result_p.stderr)


        
if __name__ == '__main__':

    data_list_file_path = './contracts/machine_auditable_faults.csv'
    # folder_name = './machine_auditable_faults'

    # get_size(folder_name)
    
    # workbook = openpyxl.load_workbook(data_list_file_path)
    # sheet = workbook.active
    urls = pd.read_csv(data_list_file_path)['Commit URL']

    # print(urls[0])

    count = 1
    for url in urls:
        repo_owner , repo_name, commit_sha = get_info(url)
        repo_url = f'https://api.github.com/repos/{repo_owner}/{repo_name}'
        repo_add_url = f'https://github.com/{repo_owner}/{repo_name}.git'
        destination_path = './contracts/machine_auditable_faults/id_' + str(count)

        # add_submodule(repo_add_url, destination_path, repo_name)
        print(repo_url)
        buggy_sha = get_parent_sha(repo_url, commit_sha)
        set_checkpoint(buggy_sha, commit_sha, destination_path, repo_name)
        # if not os.path.exists(destination_path):
        #     os.makedirs(destination_path)
        # download_repo_snapshot(repo_url, commit_sha, destination_path)
        count += 1
        # break
    

    # unzip_files('./machine_unauditable_faults')   
    # delete_files("./machine_unauditable_faults")



    # count = 0
    # for row in sheet.iter_rows(min_row=3, values_only=True):
    #     url = row[0]
    #     repo_owner , repo_name, commit_sha = get_info(url)
    #     repo_url = f'https://api.github.com/repos/{repo_owner}/{repo_name}'
    #     destination_path = './data/case' + str(count)
    #     if not os.path.exists(destination_path):
    #         os.makedirs(destination_path)
    #     download_repo_snapshot(repo_url, commit_sha, destination_path)
    #     count += 1
        
    # workbook.close()
