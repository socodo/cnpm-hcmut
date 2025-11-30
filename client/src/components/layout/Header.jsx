import Logo from "../common/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

export const Header = () => {
  const { user, fetchMe, isAuthenticated, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchMe();
    }
  }, [isAuthenticated, user, fetchMe]);

  return (
    <header className="w-screen pt-2 sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="container mx-auto flex items-center justify-between h-16 px-10">
        {/*Logo*/}
        <div>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>

        {/*Navigation */}
        <nav className="hidden md:flex items-center space-x-16 font-medium text-base text-neutral-900">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/programs"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Chương trình
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Khám phá
          </NavLink>
        </nav>

        {/* User Profile or Login Button */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {user.fullName?.charAt(0).toUpperCase() ||
                  user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-neutral-900">
                {user.fullName || user.email}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Hồ sơ cá nhân
                </NavLink>

                {/* Student Links */}
                {user.roles?.includes("STUDENT") && (
                  <>
                    <NavLink
                      to="/my-schedule"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Xem lịch của tôi
                    </NavLink>
                  </>
                )}

                {/* Tutor Links - Only show for TUTOR users */}
                {user.roles?.includes("TUTOR") && (
                  <>
                    <NavLink
                      to="/my-schedule"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Xem lịch của tôi
                    </NavLink>
                    <NavLink
                      to="/manage-schedule"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Quản lý lịch rảnh
                    </NavLink>
                  </>
                )}

                {/* Admin Panel Link - Only show for ADMIN users */}
                {user.roles?.includes("ADMIN") && (
                  <NavLink
                    to="/admin"
                    state={{ tab: "semesters" }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                    onClick={() => setShowDropdown(false)}
                  >
                    Admin Panel
                  </NavLink>
                )}

                <NavLink
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Cài đặt
                </NavLink>
                <hr className="my-2" />
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setShowDropdown(false);
                    logout();
                    navigate("/");
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to={"/login"}>
            <button className="btn-primary font-sans font-light">
              Đăng nhập{" "}
            </button>
          </NavLink>
        )}
      </div>
    </header>
  );
};
