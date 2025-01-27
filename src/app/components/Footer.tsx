export default function Footer() {
    return (
      <footer className="bg-gray-800 text-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
          <p>© {new Date().getFullYear()} Gomminjae Blog. All rights reserved.</p>
        </div>
      </footer>
    );
  }