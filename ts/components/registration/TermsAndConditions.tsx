import React from 'react';
import { SessionHtmlRenderer } from '../basic/SessionHTMLRenderer';

export const TermsAndConditions = () => {
  let a =  "<a href=\"https://getsession.org/legal/#tos\">Terms of Service</a> ";
  return (
    <div className="session-terms-conditions-agreement">
      <SessionHtmlRenderer html={a}/>
      {/* <SessionHtmlRenderer html={window.i18n('ByUsingThisService...')} /> */}
    </div>
  );
};
