import { useChatStore } from "../../../Store/useChatStore";

function IncomingCallModal({ callData, onAnswer, onReject }) {
    const clearIncomingCall = useChatStore((state) => state.clearIncomingCall);

    const handleAnswer = () => {
      clearIncomingCall();
      onAnswer();
    };
  
    const handleReject = () => {
      clearIncomingCall();
      onReject();
    };
  
    return (
      <div className="incoming-call-modal">
        <div className="caller-info">
          <img src={callData.ProfilePicture} alt="Caller" />
          <h3>{callData.FullName}</h3>
        </div>
        <div className="call-actions">
          <button onClick={handleAnswer}>Answer</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      </div>
    );
  }

export default IncomingCallModal;