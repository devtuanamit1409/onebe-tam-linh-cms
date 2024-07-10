import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutAboutPage extends Schema.Component {
  collectionName: 'components_about_about_pages';
  info: {
    displayName: 'about page';
    icon: 'earth';
    description: '';
  };
  attributes: {
    seo: Attribute.Component<'component.seo'>;
    contentFirst: Attribute.String;
    videoAbout: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    boxAbout: Attribute.Component<'about.box-gioi-thieu', true> &
      Attribute.SetMinMax<
        {
          min: 3;
          max: 3;
        },
        number
      >;
    cacTongThau: Attribute.Component<'about.list-about', true>;
    cacDoiTacNuocNgoai: Attribute.Component<'about.list-about', true>;
    cacChuDauTuNuocNgoai: Attribute.Component<'about.list-about', true>;
    cacCongTyVaTapDoan: Attribute.Component<'about.list-about', true>;
    contentEnd: Attribute.Text;
    name: Attribute.String;
    description: Attribute.Text;
  };
}

export interface AboutBoxGioiThieu extends Schema.Component {
  collectionName: 'components_about_box_gioi_thieus';
  info: {
    displayName: 'Box Gi\u1EDBi Thi\u1EC7u';
    icon: 'earth';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface AboutListAbout extends Schema.Component {
  collectionName: 'components_about_list_abouts';
  info: {
    displayName: 'ListAbout';
  };
  attributes: {
    item: Attribute.String;
  };
}

export interface ComponentBanner extends Schema.Component {
  collectionName: 'components_component_banners';
  info: {
    displayName: 'Banner';
    icon: 'earth';
  };
  attributes: {
    urlImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    alt: Attribute.String;
  };
}

export interface ComponentLink extends Schema.Component {
  collectionName: 'components_component_links';
  info: {
    displayName: 'Link';
    icon: 'earth';
  };
  attributes: {
    title: Attribute.String;
    path: Attribute.String;
  };
}

export interface ComponentSeo extends Schema.Component {
  collectionName: 'components_component_seos';
  info: {
    displayName: 'SEO';
    icon: 'earth';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    thumbnail: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    keyword: Attribute.Text;
  };
}

export interface ComponentSlug extends Schema.Component {
  collectionName: 'components_component_slugs';
  info: {
    displayName: 'Slug';
    icon: 'earth';
  };
  attributes: {
    title: Attribute.String;
    slug: Attribute.String;
  };
}

export interface ComponentSubPage extends Schema.Component {
  collectionName: 'components_component_sub_pages';
  info: {
    displayName: 'SubPage';
    icon: 'earth';
    description: '';
  };
  attributes: {
    seo: Attribute.Component<'component.seo'> & Attribute.Required;
    banner: Attribute.Component<'component.banner'>;
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
  };
}

export interface ExpertCacChuyenGia extends Schema.Component {
  collectionName: 'components_expert_cac_chuyen_gias';
  info: {
    displayName: 'C\u00E1c chuy\u00EAn gia';
    icon: 'earth';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    position: Attribute.String;
    avatar: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ExpertTrangCap2 extends Schema.Component {
  collectionName: 'components_expert_trang_cap_2s';
  info: {
    displayName: 'Trang C\u1EA5p 2';
    icon: 'earth';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    subName: Attribute.String;
    description: Attribute.Text;
    bai_viets: Attribute.Relation<
      'expert.trang-cap-2',
      'oneToMany',
      'api::bai-viet.bai-viet'
    >;
    slug: Attribute.String;
    main: Attribute.Component<'component.seo'>;
  };
}

export interface FooterIcon extends Schema.Component {
  collectionName: 'components_footer_icons';
  info: {
    displayName: 'Icon';
    icon: 'earth';
  };
  attributes: {
    urlIcon: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    alt: Attribute.String;
    path: Attribute.String;
  };
}

export interface HeaderDanhMucCha extends Schema.Component {
  collectionName: 'components_header_danh_muc_chas';
  info: {
    displayName: 'Danh M\u1EE5c Cha';
    icon: 'emotionHappy';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    subCategory: Attribute.Component<'header.danh-muc-con', true>;
    slug: Attribute.String;
  };
}

export interface HeaderDanhMucCon extends Schema.Component {
  collectionName: 'components_header_danh_muc_cons';
  info: {
    displayName: 'Danh M\u1EE5c Con';
    icon: 'earth';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    slug: Attribute.String;
  };
}

export interface HomeBannerHome extends Schema.Component {
  collectionName: 'components_home_banner_homes';
  info: {
    displayName: 'Banner Home';
    icon: 'earth';
  };
  attributes: {
    title: Attribute.String;
    urlImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    description: Attribute.Text;
    path: Attribute.String;
    name: Attribute.String;
  };
}

export interface HomeBoxServices extends Schema.Component {
  collectionName: 'components_home_box_services';
  info: {
    displayName: 'Box Services';
    icon: 'earth';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    path: Attribute.String;
  };
}

export interface HomeItemThanhVien extends Schema.Component {
  collectionName: 'components_home_item_thanh_viens';
  info: {
    displayName: 'Item Th\u00E0nh Vi\u00EAn';
    icon: 'earth';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    logo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    path: Attribute.String;
  };
}

export interface HomeListLogo extends Schema.Component {
  collectionName: 'components_home_list_logos';
  info: {
    displayName: 'List logo';
    icon: 'earth';
  };
  attributes: {
    alt: Attribute.String;
    urlImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface HomeSectionGioiThieu extends Schema.Component {
  collectionName: 'components_home_section_gioi_thieus';
  info: {
    displayName: 'Section Gi\u1EDBi Thi\u1EC7u';
    icon: 'earth';
  };
  attributes: {
    description: Attribute.Text;
    image1: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image2: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image3: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about.about-page': AboutAboutPage;
      'about.box-gioi-thieu': AboutBoxGioiThieu;
      'about.list-about': AboutListAbout;
      'component.banner': ComponentBanner;
      'component.link': ComponentLink;
      'component.seo': ComponentSeo;
      'component.slug': ComponentSlug;
      'component.sub-page': ComponentSubPage;
      'expert.cac-chuyen-gia': ExpertCacChuyenGia;
      'expert.trang-cap-2': ExpertTrangCap2;
      'footer.icon': FooterIcon;
      'header.danh-muc-cha': HeaderDanhMucCha;
      'header.danh-muc-con': HeaderDanhMucCon;
      'home.banner-home': HomeBannerHome;
      'home.box-services': HomeBoxServices;
      'home.item-thanh-vien': HomeItemThanhVien;
      'home.list-logo': HomeListLogo;
      'home.section-gioi-thieu': HomeSectionGioiThieu;
    }
  }
}
