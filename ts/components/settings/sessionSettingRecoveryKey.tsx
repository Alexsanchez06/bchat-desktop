import React, {  useState } from 'react';

// import { SessionSeedModal } from '../dialog/SessionSeedModal';
// import { useSelector } from 'react-redux';
// import {
//   getRecoveryPhraseDialog,
// } from '../../state/selectors/modal';

import { SessionButton,SessionButtonColor, SessionButtonType } from '.././basic/SessionButton';
// import {walletRPC} from "../../mains/wallet-rpc"

export const SessionSettingRecoveryKey=()=>
{
    
    const[verify,setVerify]=useState(false)
    // const [keys,setKeys]=useState({})
    // const recoveryPhraseModalState = useSelector(getRecoveryPhraseDialog);

    // async function getKeys()
    // {
    //     console.log("spend_key");
        
    //    let spend_key=await walletRPC("query_key", { key_type: "spend_key" });
    //    let view_key=await walletRPC("query_key", { key_type: "view_key" });
    //    console.log("spend_key :",spend_key ,"view_key::",view_key);
       
    // }
   
    let data=[
        {
            title:"View Key (public):",
            key:"a8s7d6sa87d6sa87d6as86das8d6sa8da8asdaasd76as8dasd67as8d6as7d6a"
        },
        {
            title:"View Key (private):",
            key:"a8s7d6sa87d6sa87d6as86das8d6sa8da8asdaasd76as8dasd67as8d6as7d6a"
        },
        {
            title:"Spend Key (public):",
            key:"a8s7d6sa87d6sa87d6as86das8d6sa8da8asdaasd76as8dasd67as8d6as7d6a"
        },
        {
            title:"Spend Key (private):",
            key:"a8s7d6sa87d6sa87d6as86das8d6sa8da8asdaasd76as8dasd67as8d6as7d6a"
        },

    ]

    
    if(verify)
    {
       return <>
       { data.map((item:any,key:any)=> (<div key={key} className='session-modal-recovery-key'>
        <div className='session-modal-recovery-key-title'>{item.title}</div>
        <div className='session-modal-recovery-key-describtion'>{item.key}</div>
       </div>)
       
       )}
       </>
    }

    
    return <div className='session-settings-recovery-seed'>
             <img  src="images/bchat/warning.svg"   className="session-settings-recovery-seed-danger "/>
             <p className="session-settings-recovery-seed-bold">IMPORTANT</p>
             <p className="session-settings-recovery-seed-red">Never Give your Key to Anyone!</p>
             <p className="session-settings-recovery-seed-para">Never input your Key into any software or website other than the official beldex wallet or bchat directly from the play store, the beldex website or the beldex GitHub.</p>
             <p className="session-settings-recovery-seed-note">Are you sure you want to access your Key?</p>
             <div className='session-settings-recovery-seed-button'>
             <SessionButton
              text={"Yes, I am Sure!"}
              onClick={()=>setVerify(true)}
              buttonType={SessionButtonType.Brand}
              buttonColor={SessionButtonColor.Green}
            //   disabled={!caption}
            />
             </div>
             
        </div>


    
}
