"use client";

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Get in touch</h3>
          <p className="text-sm text-gray-500 mt-1">
            Let&apos;s build something useful together.
          </p>
        </div>
        <div className="p-6 space-y-5">
          <a
            href="mailto:visualixefoundation@gmail.com"
            className="flex items-start gap-4 group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-envelope text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Email
              </p>
              <p className="text-emerald-600 group-hover:underline font-medium">
                visualixefoundation@gmail.com
              </p>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/roque-desouza"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <i className="fab fa-linkedin-in text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                LinkedIn
              </p>
              <p className="text-emerald-600 group-hover:underline font-medium">
                linkedin.com/in/roque-desouza
              </p>
            </div>
          </a>
          <a
            href="https://www.instagram.com/visualixe_foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <i className="fab fa-instagram text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Instagram
              </p>
              <p className="text-emerald-600 group-hover:underline font-medium">
                @visualixe_foundation
              </p>
            </div>
          </a>
        </div>
        <div className="border-t border-gray-100 p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full text-emerald-600 font-medium py-2 hover:bg-emerald-50 rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
