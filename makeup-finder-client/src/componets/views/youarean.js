// Import the CSS file
import "./AdminMessage.css";

export const AdminMessage = () => {
  return (
    <div className="admin-message-container">
      <h1 className="header-title-admin">Welcome, Admin!</h1>
      <h2 className="header-subtitle">
        Here you can manage our products, tips, and makeup preferences.
      </h2>
      <img
        className="sparkle-image"
        src="https://thumbs.dreamstime.com/b/yellow-original-bright-stars-sparkle-icon-glowing-light-effect-star-vector-illustration-yellow-original-bright-stars-sparkle-icon-192033133.jpg"
        alt="Gold Sparkle Image"
      />
    </div>
  );
};
