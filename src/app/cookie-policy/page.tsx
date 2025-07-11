'use client';

import { motion } from 'framer-motion';

export default function CookiePolicy() {
  return (
    <main className="bg-slate-900 !text-white min-h-screen pt-24 pb-20">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 !text-white">Cookies Policy</h1>
        <p className="!text-white mb-4">Last updated: April 21, 2025</p>
        
        <div className="prose prose-invert max-w-none !text-white [&_p]:!text-white [&_li]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_h4]:!text-white [&_strong]:!text-white [&_span]:!text-white [&_a]:!text-white [&_a:hover]:!text-white [&_ul]:!text-white">
          <p>This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used. This Cookies Policy has been created with the help of the Cookies Policy Generator.</p>
          
          <p>Cookies do not typically contain any information that personally identifies a user, but personal information that we store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store and keep your personal data secure, see our Privacy Policy.</p>
          
          <p>We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Interpretation and Definitions</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-2">Interpretation</h3>
          <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
          
          <h3 className="text-xl font-bold mt-6 mb-2">Definitions</h3>
          <p>For the purposes of this Cookies Policy:</p>
          
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Cookies Policy) refers to Fludo.</li>
            <li><strong>Cookies</strong> means small files that are placed on Your computer, mobile device or any other device by a website, containing details of your browsing history on that website among its many uses.</li>
            <li><strong>Website</strong> refers to Fludo, accessible from https://www.fludo.se</li>
            <li><strong>You</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">The use of the Cookies</h2>
          
          <h3 className="text-xl font-bold mt-6 mb-2">Type of Cookies We Use</h3>
          <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.</p>
          
          <p>We use both session and persistent Cookies for the purposes set out below:</p>
          
          <h4 className="text-lg font-bold mt-6 mb-2">Necessary / Essential Cookies</h4>
          <p>Type: Session Cookies</p>
          <p>Administered by: Us</p>
          <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
          
          <h4 className="text-lg font-bold mt-6 mb-2">Functionality Cookies</h4>
          <p>Type: Persistent Cookies</p>
          <p>Administered by: Us</p>
          <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Your Choices Regarding Cookies</h2>
          <p>If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.</p>
          
          <p>If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website and some features may not function properly.</p>
          
          <p>If You&apos;d like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser.</p>
          
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://support.google.com/accounts/answer/32050</a></li>
            <li>For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">http://support.microsoft.com/kb/278835</a></li>
            <li>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></li>
            <li>For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></li>
          </ul>
          
          <p>For any other web browser, please visit your web browser&apos;s official web pages.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">More Information about Cookies</h2>
          <p>You can learn more about cookies here: <a href="https://www.termsfeed.com/blog/cookies/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">All About Cookies by TermsFeed</a>.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about this Cookies Policy, You can contact us:</p>
          
          <p>By email: <a href="mailto:hello@fludo.se" className="text-blue-400 hover:text-blue-300 underline">hello@fludo.se</a></p>
        </div>
      </motion.div>
    </main>
  );
}
