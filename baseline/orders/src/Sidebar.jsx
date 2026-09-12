import React from "react";

// NOTE: This exact file is copy-pasted into dashboard/, orders/ and profile/.
// Each app owns its own copy. If the nav changes, it has to change in 3 places.
export default function Sidebar({ active }) {
  const items = [
    { key: "dashboard", label: "Dashboard", href: "http://localhost:5001/" },
    { key: "orders", label: "Orders", href: "http://localhost:5002/" },
    { key: "profile", label: "Profile", href: "http://localhost:5003/" },
  ];

  return (
    <nav style={{
      width: 200,
      minHeight: "100vh",
      background: "#1f2937",
      color: "white",
      padding: "16px 0",
      boxSizing: "border-box",
    }}>
      <div style={{ padding: "0 16px", fontWeight: 700, marginBottom: 24 }}>ACME Portal</div>
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          style={{
            display: "block",
            padding: "10px 16px",
            color: item.key === active ? "#93c5fd" : "white",
            background: item.key === active ? "#111827" : "transparent",
            textDecoration: "none",
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

