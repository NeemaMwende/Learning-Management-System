import React, { useContext } from "react";
import { ProfileContext } from "../../plugin/Context";

function Header() {
  const [profile, setProfile] = useContext(ProfileContext);

  return (
    <div className="row align-items-center">
      <div className="col-xl-12 col-lg-12 col-md-12 col-12">
        <div className="card px-4 pt-2 pb-4 shadow-sm rounded-3">
          <div className="d-flex align-items-end justify-content-between">
            <div className="d-flex align-items-center">
              <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                <img
                  src={profile.image}
                  className="avatar-xl rounded-circle border border-4 border-white"
                  alt="avatar"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="lh-1">
                <h2 className="mb-0"> {profile.full_name}</h2>
                <p className="mb-0 d-block">{profile.about}</p>
              </div>
            </div>
            <div>
              <a
                href="profile-edit.html"
                className="btn btn-primary btn-sm d-none d-md-block"
              >
                Account Setting <i className="fas fa-gear fa-spin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;