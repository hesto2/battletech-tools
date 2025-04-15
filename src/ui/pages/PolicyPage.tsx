import React from "react";

const PolicyPage = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Privacy Policy for BattleTech Tools
      </h1>
      Effective Date: Tuesday January 28th, 2025
      <h2>1. Introduction</h2>
      <p>
        Welcome to BattleTech Tools ("we," "our," "us"). Your privacy is
        important to us. This Privacy Policy explains how we collect, use, and
        protect your information when you use our website (the "Service").
      </p>
      <h2>2. Information We Collect</h2>
      <p>
        When you use BattleTech Tools and sign in with Google OAuth, we collect
        your email address. We do not collect, store, or process any other
        personal data.
      </p>
      <h2>3. How We Use Your Information</h2>
      <p>
        We use your email address solely for authentication and account access
        purposes. We do not share, sell, or use your email for marketing or any
        other purpose.
      </p>
      <h2>4. Data Storage and Security</h2>
      <p>
        We take reasonable measures to protect your email address. However, as
        no method of transmission over the internet is 100% secure, we cannot
        guarantee absolute security.
      </p>
      <h2>5. Third-Party Services</h2>
      <p>
        Our authentication process relies on Google OAuth. By signing in, you
        acknowledge and agree to Google’s Privacy Policy and Terms of Service.
      </p>
      <h2>6. Your Rights and Choices</h2>
      <p>
        Since we only collect your email address for authentication, if you wish
        to remove your data from our system, you can do so by discontinuing use
        of the Service. You may also contact us for data removal requests.
      </p>
      <h2>7. Changes to This Privacy Policy</h2>
      <p>
        We may update this policy from time to time. Any changes will be posted
        on this page with an updated effective date.
      </p>
    </div>
  );
};

export default PolicyPage;
