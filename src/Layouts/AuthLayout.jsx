import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";

const AuthLayout = ({ children, imgSrc }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 grid lg:grid-cols-2">
        {/* Form Section */}
        <div className="flex flex-col gap-6 p-6 md:p-10 lg:p-16 bg-background transition-colors">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative hidden lg:block overflow-hidden">
          <img
            src={imgSrc}
            alt="Books and Library"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-indigo-900/40 to-teal-900/60" />

          {/* Optional Overlay Text */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center text-white space-y-4">
              <h2 className="text-4xl font-bold drop-shadow-lg">
                Welcome to The Book Haven
              </h2>
              <p className="text-xl text-indigo-100 drop-shadow-md">
                Your personal digital library awaits
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthLayout;
