
import  ChildProcess  from "child_process";
import fs from "fs-extra";
import path from 'path';
import { default as insecureNodeFetch } from 'node-fetch';
import { HTTPError } from '../session/utils/errors';
// import portscanner from 'portscanner';
// import killport from 'kill-port';

export const startWalletRpc = ()=> {
  console.log("uuntu:",process.platform)
    const rpcExecutable =
    process.platform === "linux"
      ? "beldex-wallet-rpc-ubuntu"
      : "beldex-wallet-rpc-darwin";
console.log("rpcExecutable:",rpcExecutable)
  // eslint-disable-next-line no-undef
  let __ryo_bin = path.join(process.cwd(), "/bin").replace(/\\/g, "\\\\");
  console.log("__ryo:",__ryo_bin);
  
  const rpcPath = path.join(__ryo_bin, rpcExecutable);
  const walletDir = `${process.cwd()}/wallet`
  console.log("walletDir:",walletDir)
  if (!fs.existsSync(walletDir)) {
    fs.mkdirpSync(walletDir)
  }
  if (!fs.existsSync(rpcPath)) {
    console.log("not exit")
      new Error(
        "Failed to find Beldex Wallet RPC. Please make sure your anti-virus has not removed it."
      )
    return;
  }
  console.log("WAIT")
//   portscanner.checkPortStatus(22026, "127.0.0.1")
//           .catch((err) =>
//            console.log("catched:",err))
//           .then(status => {
//             console.log("status:",status);

//             if (status === "closed") {
//             }});
//   console.log("STOP")   
//   console.log("walletpath:",rpcPath)       
   let wallet= ChildProcess.spawn(
    rpcPath,
    [
        '--rpc-login','test:test',
        '--rpc-bind-port','22026',
        '--daemon-address','explorer.beldex.io:19091',
        '--rpc-bind-ip','127.0.0.1',
        '--log-level', '0',
        '--wallet-dir',`${walletDir}`,
        '--log-file', `${walletDir}/wallet-rpc.log`
    ],
    { detached: true })

    wallet.stdout.on("data", data => {
        process.stdout.write(`Wallet: ${data}`);
    })
    wallet.stdout.on("error", err =>
                process.stderr.write(`Wallet: ${err}`)
    );
    wallet.stdout.on("close", (code: any) => {
        process.stderr.write(`Wallet: exited with code ${code} \n`);
                if (code === null) {
                    window?.log?.warn("Failed to start wallet RPC");
                }
    });
} 

export const createWallet = async() => {
  const walletName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7);
  await walletRPC("create_wallet", {
    name: walletName,
    language: 'English',
    password: ''
  });
    let getAddress = await walletRPC("get_address");
    let getMnemonic = await walletRPC("query_key", { key_type: "mnemonic" });
     console.log("AADRESS:",getAddress);
     console.log("Mnemonic:",getMnemonic)
  const wallet = {
      address: getAddress.address,
      secret: {
        mnemonic: getMnemonic.key
      }
    };

  window.WalletAddress = wallet.address;
  await walletRPC("store").then(()=>{
        let address_txt_path = path.join(
          `${process.cwd()}/wallet`,
          walletName + ".address.txt"
    );
        if (!fs.existsSync(address_txt_path)) {
      fs.writeFile(address_txt_path, wallet.address, "utf8", () => {
      });
        }
  });
  return wallet;
}

export const walletRPC = async(method: string, params = {}) => {
  const url = "http://localhost:22026/json_rpc";
  const fetchOptions = {
    method: "POST"
    , "body": JSON.stringify({
      "jsonrpc": "2.0",
      "id": "0",
      "method": method,
      params
    })
    , "headers": {
      'Authorization': 'Basic ' + btoa('test:test')
    }
  };
  const response = await insecureNodeFetch(url, fetchOptions);
  if (!response.ok) {
    throw new HTTPError('wallet_rpc error', response);
  }
  let result = await response.json();
  console.log("response.json():",result)
  return result.result;
}

export const getLatestHeight = async() =>{
  const response = await insecureNodeFetch("http://explorer.beldex.io:19091/get_height", {
      method: "POST"
      , "body": JSON.stringify({})
      });
      if (!response.ok) {
        throw new HTTPError('Loki_rpc error', response);
      }
      let result = await response.json();
      return result.height;
}