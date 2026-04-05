export const ModernSection = () => {
  return (
    <section className="modern-section">
      <div className="modern-container">
        <div className="modern-image-wrapper">
          <img
            src="https://i.ibb.co/DD6D7xfC/lockatoo.png"
            alt="locker"
            className="modern-image"
          />
        </div>

        <div className="modern-content">
          <h2 className="modern-title">Modern and convenient</h2>

          <p className="modern-text">
            Our state-of-the-art locker facilities are designed with your
            convenience in mind. Clean, secure, and easy to use.
          </p>

          <ul className="modern-list">
            <li className="modern-list-item">
              <span className="modern-icon">✓</span>
              Easy booking
            </li>

            <li className="modern-list-item">
              <span className="modern-icon">✓</span>
              Multiple sizes
            </li>

            <li className="modern-list-item">
              <span className="modern-icon">✓</span>
              Secure system
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
