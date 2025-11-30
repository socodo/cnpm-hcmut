import heroImage from "../../../assets/img/unnamed.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mt-10">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Kết Nối Sinh Viên Và Giảng Viên Để{" "}
            <span className="text-sky-500 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              Học Tập Tốt Hơn
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-2xl">
            Nền tảng kết nối sinh viên với giáo viên của trường Đại Học Bách
            Khoa TPHCM, giúp sinh viên giải đáp những vấn đề của mình một cách
            nhanh chóng tiện lợi với các giáo sư hàng đầu.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/explore"
              className="btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center"
            >
              Theo dõi ngay
            </Link>
            <Link
              to="/programs"
              className="btn-outline text-lg px-8 py-3 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="relative">
            <img
              src={heroImage}
              alt="Hero - Kết nối sinh viên và giảng viên"
              className="relative rounded-2xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-300 w-full h-64 md:h-80 lg:h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
