import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./Profile.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };



  const handleImageChange = (e) => {

    setProfileImage(e.target.files[0]);

    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  
  // ...
  
  
  

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "vickdawson");
        image.append("upload_preset", "lzye0s0v");

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/vickdawson/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
       imageURL = imgData.url.toString();

       // Ensure the URL is HTTPS
      if (imageURL.startsWith("http://")) {
        imageURL = "https://" + imageURL.substring(7);
       }
        // Save Profile
        const formData = {
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          photo: profileImage ? imageURL : profile.photo,
        };

         await updateUser(formData);
         URL.revokeObjectURL(imagePreview);
        toast.success("User updated");
        navigate("/profile");
        setIsLoading(false);
      }
    } catch (error) {
      
      setIsLoading(false);
      URL.revokeObjectURL(imagePreview);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile --my2 displayflex" id="top">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={ imagePreview || user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            
            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              <button className="--btn --btn-primary">Save Profile Changes</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
