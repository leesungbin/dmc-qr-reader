interface ModalProps {
  user: any;
}
export function Modal({ user }: ModalProps) {
  const name = user["이름"];
  const group = user["조"];
  const church = user["출석 교회"];
  const ticketId = user["TicketID"];
  return (
    <div
      style={{
        position: "absolute",
        top: 30,
        left: 0,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#EDF7ED",
          height: "100%",
          width: "280px",
          maxHeight: "300px",
          margin: "auto",
          padding: "10px",
          borderRadius: "16px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>🎉 환영합니다! 🎉</h1>
        <p style={{ fontSize: "32px", textAlign: "center" }}>
          <span style={{ fontSize: "40px", fontWeight: 500 }}>{name}</span> 님은
        </p>
        <p style={{ fontSize: "32px", textAlign: "center" }}>
          <span style={{ fontSize: "40px", fontWeight: 500 }}>{group}조</span>{" "}
          입니다.
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#2f2f2f" }}>TicketID: {ticketId}</span>
          <span style={{ color: "#2f2f2f" }}>{church}</span>
        </div>
      </div>
    </div>
  );
}
