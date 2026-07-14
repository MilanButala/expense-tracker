import PropTypes from "prop-types";

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  size = "max-w-4xl",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className={`relative w-full ${size} rounded-xl bg-white shadow-xl`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-xl font-semibold text-text-primary">
            {title}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.string,
};

export default Modal;