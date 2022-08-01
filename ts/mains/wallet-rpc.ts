import ChildProcess from "child_process";
import fs from "fs-extra";
import path from 'path';
// import fixPath from 'fix-path';
import { default as insecureNodeFetch } from 'node-fetch';
import { HTTPError } from '../bchat/utils/errors';
// import portscanner from 'portscanner';
// import killport from 'kill-port';
export const startWalletRpc = async() => {
  try{
  //  await fixPath();
  console.log("uuntu:", process.platform)
  const rpcExecutable =
    process.platform === "linux" ? "beldex-wallet-rpc-ubuntu" : "beldex-wallet-rpc-darwin";
  console.log("rpcExecutable:", rpcExecutable)
  // eslint-disable-next-line no-undef
  let __ryo_bin = path.join(process.cwd(), "/bin").replace(/\\/g, "\\\\");
  console.log("__ryo:", __ryo_bin);

  const rpcPath = path.join(__ryo_bin, rpcExecutable);
  const walletDir = `${process.cwd()}/wallet`
  console.log("walletDir:", walletDir)
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
  // ChildProcess.execFile(
  //   rpcPath,
  //   [
  //     // '--rpc-login','test:test',
  //     '--disable-rpc-login',
  //     '--rpc-bind-port', '22026',
  //     '--daemon-address', 'explorer.beldex.io:19091',
  //     '--rpc-bind-ip', '127.0.0.1',
  //     '--log-level', '0',
  //     '--wallet-dir', `${walletDir}`,
  //     '--log-file', `${walletDir}/wallet-rpc.log`
  //   ],
  //   // { detached: true }
  //   function(error: any, stdout: any, stderr: any){
  //     console.log("stdout",stdout);
  //     console.log("error",error);
  //     console.log("stderr",stderr);

  //   });

  let wallet =  await ChildProcess.spawn(
    rpcPath,
    [
      // '--rpc-login','test:test',
      '--disable-rpc-login',
      '--rpc-bind-port', '22026',
      '--daemon-address', 'explorer.beldex.io:19091',
      '--rpc-bind-ip', '127.0.0.1',
      '--log-level', '0',
      '--wallet-dir', `${walletDir}`,
      '--log-file', `${walletDir}/wallet-rpc.log`
    ],
    { detached: true });
  wallet.stdout.on("data", data => {
    process.stdout.write(`Wallet: ${data}`);
  })
  wallet.stdout.on("error", err =>
    process.stderr.write(`Wallet: ${err}`)
  );
  wallet.stdout.on("close", (code: any) => {
    process.stderr.write(`Wallet: exited with code ${code} \n`);
    if (code === null) {
      console.log("Failed to start wallet RPC");
    }
  });
}catch(e){
  console.log('exception during wallet-rpc:', e);
  }
}

  export async function  generateMnemonic() :Promise<any> {
  try{
    const walletName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7);
    console.log("walletName:", walletName)
    const createWallet = await walletRPC("create_wallet", {
      name: walletName,
      language: 'English',
      password: ''
    });
    console.log("CREATE_WALLET:",createWallet)
    let key_path = path.join(
      `${process.cwd()}/wallet`,
      walletName + ".keys"
    );
    let getAddress;
    if (!fs.existsSync(key_path)) {
      getAddress = (await restoreWallet(walletName, createWallet.key));
    } else {
      getAddress = await walletRPC("get_address");
    }
    let spend_key=await walletRPC("query_key", { key_type: "spend_key" });
    let view_key=await walletRPC("query_key", { key_type: "view_key" });
    localStorage.setItem("spend_key",JSON.stringify(spend_key));
    localStorage.setItem("view_key",JSON.stringify(view_key));
    localStorage.setItem("userAddress",getAddress.address);
    let address_txt_path = path.join(
      `${process.cwd()}/wallet`,
      walletName + ".address.txt"
    );
    if (!fs.existsSync(address_txt_path)) {
      fs.writeFile(address_txt_path, getAddress.address, "utf8", () => {
      });
    }
    return createWallet.key;
 }catch(e){
  console.log('exception during wallet-rpc:', e);
  }
}

export const walletRPC = async (method: string, params = {}) => {
  try{
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
  console.log("result:",result)
  return result.result;
}catch(e){
  console.log('exception during wallet-rpc:', e);
  }
}

export const getLatestHeight = async () => {
  try{
  const response = await insecureNodeFetch("http://explorer.beldex.io:19091/get_height", {
    method: "POST"
    , "body": JSON.stringify({})
  });
  if (!response.ok) {
    throw new HTTPError('Loki_rpc error', response);
  }
  let result = await response.json();
  return result.height;
}catch(e){
  console.log('exception during wallet-rpc:', e);
  }
}

export const restoreWallet = async (displayName: string, userRecoveryPhrase: string) => {
  try{
console.log("restore:",displayName,userRecoveryPhrase)
  console.log("height:", await getLatestHeight())
  console.log("display anme", displayName, userRecoveryPhrase)
  const restoreWallet = await walletRPC("restore_deterministic_wallet", {
    restore_height: await getLatestHeight(),
    filename: displayName,
    password: "",
    seed: userRecoveryPhrase
  });
  return restoreWallet;
}catch(e){
  console.log('exception during wallet-rpc:', e);
  }

}