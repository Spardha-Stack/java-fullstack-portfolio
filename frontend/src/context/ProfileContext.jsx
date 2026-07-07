import React, { createContext, useContext, useEffect, useState } from "react";
import profileImage from "../assets/images/profile.jpg";
import { profileService } from "../services/api";

const defaultProfile = {
  name: "",
  title: "",
  roles: [],
  photo: profileImage,
  email: "",
  phone: "",
  location: "",
  summary: "",
  socials: {
    github: "",
    linkedin: "",
    leetcode: "",
    hackerrank: "",
  },
};

const ProfileContext = createContext(defaultProfile);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await profileService.get();

        setProfile({
          ...data,
          photo: profileImage,
          socials: {
            github: data.githubUrl,
            linkedin: data.linkedinUrl,
            leetcode: data.leetcodeUrl,
            hackerrank:
              "https://www.hackerrank.com/profile/spardha964864sh1",
          },
        });
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);