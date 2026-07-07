import React, { createContext, useContext, useEffect, useState } from "react";
import profileImage from "../assets/images/profile.jpg";
import { profileService } from "../services/api";

const defaultProfile = {
  name: "",
  title: "",
  roles: ["Java Full Stack Developer"],

  photo: profileImage,

  email: "",
  phone: "",
  location: "",
  summary: "",

  socials: {
    github: "",
    linkedin: "",
    leetcode: "",
    hackerrank: "https://www.hackerrank.com/profile/spardha964864sh1",
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
          ...defaultProfile,

          ...data,

          photo: profileImage,

          roles:
            data.roles && data.roles.length > 0
              ? data.roles
              : defaultProfile.roles,

          socials: {
            github: data.githubUrl || "",
            linkedin: data.linkedinUrl || "",
            leetcode: data.leetcodeUrl || "",
            hackerrank:
              "https://www.hackerrank.com/profile/spardha964864sh1",
          },
        });
      } catch (error) {
        console.error("Failed to load profile", error);

        // Continue using the default profile instead of crashing.
        setProfile(defaultProfile);
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