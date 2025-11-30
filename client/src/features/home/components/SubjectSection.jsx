import data from "../../../assets/img/data.png";
import probability from "../../../assets/img/xstk.png";
import calculus from "../../../assets/img/math.png";
import { Link } from "react-router-dom";

const subjectData = [
  {
    img: calculus,
    name: "Toán Học",
    des: "Giải tích, Đại số, Hình học và nhiều hơn nữa",
    tutors: 15,
    students: "300+",
  },
  {
    img: probability,
    name: "Vật Lý",
    des: "Cơ học, Điện từ, Lượng tử và các lĩnh vực khác",
    tutors: 12,
    students: "250+",
  },
  {
    img: data,
    name: "Hóa Học",
    des: "Hóa đại cương, Hữu cơ, Vô cơ và Phân tích",
    tutors: 10,
    students: "200+",
  },
];

const SubjectSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Khám Phá Các Môn Học
          </h2>
          <p className="text-lg text-gray-600">
            Tìm kiếm giảng viên cho các môn học bạn cần hỗ trợ
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {subjectData.map((subject, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={subject.img}
                  alt={subject.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {subject.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {subject.des}
                </p>

                {/* Stats */}
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span>
                    {subject.tutors} giảng viên
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span>
                    {subject.students} sinh viên
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <Link
            to="/explore"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Xem Tất Cả Môn Học
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubjectSection;
