export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  bio: string;
  profile_image_url: string;
  date_of_birth: string;
  nationality: string;
  phone: string;
  email: string;
  address: string;
  languages: string;
  resume_url: string;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  image_url: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  id: number;
  site_title: string;
  site_description: string;
  admin_email: string;
  copyright_text: string;
  created_at: string;
  updated_at: string;
}
