interface MoneyInfo {
  value: string;
  image: any;
  frontDescription: string;
  backDescription: string;
  color: string;
  size: string;
  year: string;
  material: string;
  features: string[];
  standardFeatures: string[];
}

export const moneyData: { [key: string]: MoneyInfo } = {
  "010000": {
    value: "10,000",
    image: require('@/assets/money/10000.png'),
    frontDescription: "Dòng chữ 'Cộng hòa Xã hội Chủ nghĩa Việt Nam', Quốc huy, Chân dung Chủ tịch Hồ Chí Minh, Mệnh giá bằng chữ và số",
    backDescription: "Dòng chữ 'Ngân hàng Nhà nước Việt Nam', Cảnh khai thác dầu khí, Mệnh giá bằng chữ và số",
    color: "Nâu đỏ",
    size: "132 x 60mm",
    year: "2006",
    material: "Polymer",
    features: [
      "Hình bông lúa dưới tia cực tím",
      "Dây bảo hiểm màu đỏ",
      "Số xê-ri màu đỏ"
    ],
    standardFeatures: [
      "Hình trang trí hoa văn dân tộc",
      "Hoa văn lưới hiện đại",
      "Chất liệu Cotton pha Polymer"
    ]
  },
  "020000": {
    value: "20,000",
    image: require('@/assets/money/20000.png'),
    frontDescription: "Dòng chữ 'Cộng hòa Xã hội Chủ nghĩa Việt Nam', Quốc huy, Chân dung Chủ tịch Hồ Chí Minh, Mệnh giá bằng chữ và số",
    backDescription: "Dòng chữ 'Ngân hàng Nhà nước Việt Nam', Phong cảnh Chùa Cầu, Hội An, Quảng Nam, Mệnh giá bằng chữ và số",
    color: "Xanh lục",
    size: "136 x 65mm",
    year: "2006",
    material: "Polymer",
    features: [
      "Hình bông lúa dưới tia cực tím",
      "Dây bảo hiểm màu xanh",
      "Số xê-ri màu xanh"
    ],
    standardFeatures: [
      "Hình trang trí hoa văn dân tộc",
      "Hoa văn lưới hiện đại",
      "Chất liệu Cotton pha Polymer"
    ]
  },
  "050000": {
    value: "50,000",
    image: require('@/assets/money/50000.png'),
    frontDescription: "Dòng chữ 'Cộng hòa Xã hội Chủ nghĩa Việt Nam', Quốc huy, Chân dung Chủ tịch Hồ Chí Minh, Mệnh giá bằng chữ và số",
    backDescription: "Dòng chữ 'Ngân hàng Nhà nước Việt Nam', Phong cảnh Huế, Mệnh giá bằng chữ và số",
    color: "Xanh lam",
    size: "140 x 65mm",
    year: "2006",
    material: "Polymer",
    features: [
      "Hình bông lúa dưới tia cực tím",
      "Dây bảo hiểm màu vàng",
      "Số xê-ri màu nâu đỏ"
    ],
    standardFeatures: [
      "Hình trang trí hoa văn dân tộc",
      "Hoa văn lưới hiện đại",
      "Chất liệu Cotton pha Polymer"
    ]
  },
  "100000": {
    value: "100,000",
    image: require('@/assets/money/100000.png'),
    frontDescription: "Dòng chữ 'Cộng hòa Xã hội Chủ nghĩa Việt Nam', Quốc huy, Chân dung Chủ tịch Hồ Chí Minh, Mệnh giá bằng chữ và số",
    backDescription: "Dòng chữ 'Ngân hàng Nhà nước Việt Nam', Phong cảnh Văn Miếu - Quốc Tử Giám, Mệnh giá bằng chữ và số",
    color: "Xanh lục",
    size: "144 x 65mm",
    year: "2006",
    material: "Polymer",
    features: [
      "Hình bông lúa dưới tia cực tím",
      "Dây bảo hiểm màu đỏ",
      "Số xê-ri màu nâu đỏ",
      "Mực đổi màu từ xanh lục sang nâu đỏ"
    ],
    standardFeatures: [
      "Hình trang trí hoa văn dân tộc",
      "Hoa văn lưới hiện đại",
      "Chất liệu Cotton pha Polymer"
    ]
  },
  "200000": {
    value: "200,000",
    image: require('@/assets/money/200000.png'),
    frontDescription: "Dòng chữ 'Cộng hòa Xã hội Chủ nghĩa Việt Nam', Quốc huy, Chân dung Chủ tịch Hồ Chí Minh, Mệnh giá bằng chữ và số",
    backDescription: "Dòng chữ 'Ngân hàng Nhà nước Việt Nam', Phong cảnh Vịnh Hạ Long, Mệnh giá bằng chữ và số",
    color: "Nâu đỏ",
    size: "148 x 65mm",
    year: "2006",
    material: "Polymer",
    features: [
      "Hình bông lúa dưới tia cực tím",
      "Dây bảo hiểm màu vàng",
      "Số xê-ri màu nâu đỏ",
      "Mực đổi màu từ vàng sang xanh lục"
    ],
    standardFeatures: [
      "Hình trang trí hoa văn dân tộc",
      "Hoa văn lưới hiện đại",
      "Chất liệu Cotton pha Polymer"
    ]
  },
  "500000": {
    value: "500,000",
    image: require('@/assets/money/500000.png'),
    frontDescription: "Dòng chữ 'Cộng hòa Xã hội Chủ nghĩa Việt Nam', Quốc huy, Chân dung Chủ tịch Hồ Chí Minh, Mệnh giá bằng chữ và số",
    backDescription: "Dòng chữ 'Ngân hàng Nhà nước Việt Nam', Phong cảnh nhà Chủ tịch Hồ Chí Minh ở Kim Liên, Mệnh giá bằng chữ và số",
    color: "Xanh lam đậm",
    size: "152 x 65mm",
    year: "2006",
    material: "Polymer",
    features: [
      "Hình bông lúa dưới tia cực tím",
      "Dây bảo hiểm màu đỏ",
      "Số xê-ri màu nâu đỏ",
      "Mực đổi màu từ tím than sang xanh lục",
      "Hình ẩn mệnh giá 500000"
    ],
    standardFeatures: [
      "Hình trang trí hoa văn dân tộc",
      "Hoa văn lưới hiện đại",
      "Chất liệu Cotton pha Polymer"
    ]
  }
}; 