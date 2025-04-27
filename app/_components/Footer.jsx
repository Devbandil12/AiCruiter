import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#53485d] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">Mockly</h2>
            <p className="text-sm text-gray-200 mt-1">
              Ace your interviews & perfect your resume.
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-8">
            <Link
              href="/about"
              className="text-gray-200 hover:text-white transition"
            >
              About
            </Link>
            <Link
              href="/interviews"
              className="text-gray-200 hover:text-white transition"
            >
              Mock Interviews
            </Link>
            <Link
              href="/resume"
              className="text-gray-200 hover:text-white transition"
            >
              Resume Analyzer
            </Link>
            <Link
              href="/contact"
              className="text-gray-200 hover:text-white transition"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 my-6"></div>

        {/* Bottom Text */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
          <p>© {new Date().getFullYear()} Mockly. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
