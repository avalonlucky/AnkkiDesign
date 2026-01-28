import React, { useState } from 'react';
import { Search, Upload, Download, Eye, Settings, Users, FolderOpen, Grid, List, Moon, Sun, ChevronRight, ChevronDown, Clock, Tag, FileText, Image, FileSpreadsheet, Presentation, MoreVertical, Plus, Filter, Bell, LogOut, BarChart3, Shield, History, Bookmark, Star, Check, X, Edit, Trash2, Copy, Play, Layers, Layout, PieChart, Type, ImageIcon, GitBranch, Table, Map, Award, User, Camera, MessageSquare, Send, ThumbsUp, AlertCircle, Lightbulb, Bug, Folder } from 'lucide-react';

// Ankki Design - 企业视觉素材管理平台 V2
export default function AnkkiDesignV2() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewAsset, setPreviewAsset] = useState(null);
  
  // 用户登录状态和权限
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: '系统管理员',
    email: 'superadmin@ankki.com',
    role: 'superadmin', // superadmin: 超级管理员, admin: 管理员, user: 普通用户
    avatar: '👤',
  });
  
  // 侧边栏分类展开状态
  const [expandedCategories, setExpandedCategories] = useState(['ppt']);
  
  // 当前选中的子分类
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  
  // 权限检查函数
  const hasPermission = (permission) => {
    const permissions = {
      superadmin: ['all', 'manage_admins', 'manage_users', 'upload', 'delete', 'edit', 'view', 'audit', 'settings', 'stats'],
      admin: ['upload', 'delete', 'edit', 'view', 'audit', 'stats'],
      user: ['view', 'download'],
    };
    return permissions[currentUser.role]?.includes(permission) || permissions[currentUser.role]?.includes('all');
  };
  
  // 是否是超级管理员
  const isSuperAdmin = currentUser.role === 'superadmin';
  // 是否是管理员（包含超级管理员）
  const isAdmin = currentUser.role === 'superadmin' || currentUser.role === 'admin';
  
  // PPT模版库状态
  const [pptTab, setPptTab] = useState('complete'); // complete: 整套, single: 单页
  const [pptCompleteCategory, setPptCompleteCategory] = useState('workplace');
  const [pptCompleteSubCategory, setPptCompleteSubCategory] = useState('report');
  const [pptSingleCategory, setPptSingleCategory] = useState('essential');
  const [pptSingleSubCategory, setPptSingleSubCategory] = useState('cover');
  const [previewPPT, setPreviewPPT] = useState(null); // PPT预览状态
  const [previewPage, setPreviewPage] = useState(0); // 当前预览页码
  
  // 主题配置 - Claude 风格
  const theme = darkMode ? {
    bg: '#1a1a1a',
    bgSecondary: '#252525',
    bgTertiary: '#2d2d2d',
    text: '#f5f5f5',
    textSecondary: '#a0a0a0',
    textMuted: '#666666',
    border: '#333333',
    accent: '#d97757',
    accentHover: '#c4684a',
    accentLight: 'rgba(217, 119, 87, 0.15)',
    success: '#4ade80',
    warning: '#fbbf24',
    cardBg: '#222222',
    cardHover: '#2a2a2a',
    tagBg: '#333333',
  } : {
    bg: '#faf9f7',
    bgSecondary: '#ffffff',
    bgTertiary: '#f5f4f2',
    text: '#1a1a1a',
    textSecondary: '#666666',
    textMuted: '#999999',
    border: '#e8e6e3',
    accent: '#d97757',
    accentHover: '#c4684a',
    accentLight: 'rgba(217, 119, 87, 0.1)',
    success: '#22c55e',
    warning: '#f59e0b',
    cardBg: '#ffffff',
    cardHover: '#faf9f7',
    tagBg: '#f5f4f2',
  };

  // PPT整套模板数据
  const pptCompleteTemplates = [
    { id: 1, name: '经管会汇报模版', desc: '适合汇报/述职/竞聘（逻辑框架+数据图表+...', views: '7.1W', thumbnail: '📊', tag: '热门', pages: 200, 
      previewPages: [
        { title: '封面', content: '经管会工作汇报', color: '#1e40af' },
        { title: '目录', content: '01 工作回顾\n02 数据分析\n03 问题总结\n04 下步计划', color: '#1e3a8a' },
        { title: '工作回顾', content: '本季度完成销售额 ¥2,580万\n同比增长 23.5%', color: '#1d4ed8' },
        { title: '数据分析', content: '市场份额提升至 18.6%\n客户满意度 96.2%', color: '#2563eb' },
        { title: '结尾', content: '感谢聆听', color: '#1e40af' },
      ]
    },
    { id: 2, name: '月度/季度汇报模版', desc: '月度季度工作总结汇报模版｜数据可视化...', views: '4.2W', thumbnail: '📅', tag: '热门', pages: 200,
      previewPages: [
        { title: '封面', content: '2024年Q4季度汇报', color: '#047857' },
        { title: '本月概览', content: '完成率 98.5%\n新增客户 126家', color: '#059669' },
        { title: '业绩对比', content: '环比增长 15%\n同比增长 32%', color: '#10b981' },
        { title: '下月计划', content: '目标销售额 ¥500万\n拓展新市场 3个', color: '#047857' },
        { title: '结尾', content: '谢谢大家', color: '#065f46' },
      ]
    },
    { id: 3, name: '销售年会汇报模版', desc: '年度销售总结｜业绩展示｜颁奖典礼...', views: '8.3W', thumbnail: '🏆', tag: '热门', pages: 150,
      previewPages: [
        { title: '封面', content: '2024年度销售年会', color: '#b91c1c' },
        { title: '年度回顾', content: '全年销售额突破 ¥1.2亿\n团队人数增长 50%', color: '#dc2626' },
        { title: '销售冠军', content: '🥇 张三 ¥1,580万\n🥈 李四 ¥1,230万\n🥉 王五 ¥980万', color: '#ef4444' },
        { title: '明年目标', content: '销售目标 ¥2亿\n市场扩张 5个城市', color: '#b91c1c' },
        { title: '结尾', content: '共创辉煌', color: '#991b1b' },
      ]
    },
    { id: 4, name: '战略规划汇报模版', desc: '企业战略规划｜发展蓝图｜目标分解...', views: '29.2W', thumbnail: '🎯', tag: '热门', pages: 500,
      previewPages: [
        { title: '封面', content: '2025-2030战略规划', color: '#7c3aed' },
        { title: '愿景使命', content: '成为行业领先的数据安全服务商', color: '#8b5cf6' },
        { title: '战略目标', content: '营收增长 300%\n市场份额 25%\n客户数量 10,000+', color: '#a78bfa' },
        { title: '实施路径', content: '第一阶段：夯实基础\n第二阶段：快速扩张\n第三阶段：行业领先', color: '#7c3aed' },
        { title: '结尾', content: '携手共进', color: '#6d28d9' },
      ]
    },
    { id: 5, name: '项目进度汇报模版', desc: '项目管理｜进度跟踪｜里程碑展示...', views: '3.8W', thumbnail: '📋', tag: '推荐', pages: 50,
      previewPages: [
        { title: '封面', content: '项目进度汇报', color: '#0891b2' },
        { title: '项目概览', content: '项目名称：数据平台升级\n总工期：6个月\n当前进度：65%', color: '#06b6d4' },
        { title: '里程碑', content: '✅ 需求分析\n✅ 系统设计\n🔄 开发测试\n⏳ 上线部署', color: '#22d3ee' },
        { title: '风险预警', content: '资源风险：中\n技术风险：低\n进度风险：低', color: '#0891b2' },
        { title: '结尾', content: '项目顺利推进中', color: '#0e7490' },
      ]
    },
    { id: 6, name: '产品发布汇报模版', desc: '新品发布｜产品介绍｜功能亮点...', views: '5.6W', thumbnail: '🚀', tag: '推荐', pages: 200,
      previewPages: [
        { title: '封面', content: '新产品发布会', color: '#ea580c' },
        { title: '产品介绍', content: '昂楷数据安全平台 V3.0\n全新架构 · 极致性能', color: '#f97316' },
        { title: '核心功能', content: '🔒 数据加密\n🛡️ 访问控制\n📊 审计分析\n🚨 风险预警', color: '#fb923c' },
        { title: '技术优势', content: '性能提升 200%\n部署时间缩短 50%', color: '#ea580c' },
        { title: '结尾', content: '即刻体验', color: '#c2410c' },
      ]
    },
    { id: 7, name: '技术方案汇报模版', desc: '技术架构｜解决方案｜实施方案...', views: '2.1W', thumbnail: '💻', tag: '推荐', pages: 150,
      previewPages: [
        { title: '封面', content: '技术方案汇报', color: '#4f46e5' },
        { title: '需求分析', content: '业务痛点分析\n技术需求梳理', color: '#6366f1' },
        { title: '技术架构', content: '微服务架构\n分布式部署\n高可用设计', color: '#818cf8' },
        { title: '实施计划', content: '第1周：环境搭建\n第2-4周：核心开发\n第5周：测试上线', color: '#4f46e5' },
        { title: '结尾', content: '技术驱动创新', color: '#4338ca' },
      ]
    },
    { id: 8, name: '市场分析汇报模版', desc: '市场调研｜竞品分析｜趋势洞察...', views: '1.8W', thumbnail: '📈', tag: '推荐', pages: 150,
      previewPages: [
        { title: '封面', content: '市场分析报告', color: '#0d9488' },
        { title: '市场规模', content: '2024年市场规模 ¥500亿\n年增长率 18.5%', color: '#14b8a6' },
        { title: '竞品分析', content: '竞品A：市场份额 22%\n竞品B：市场份额 18%\n我司：市场份额 15%', color: '#2dd4bf' },
        { title: '机会洞察', content: '新兴市场机会\n技术创新方向\n客户需求变化', color: '#0d9488' },
        { title: '结尾', content: '把握机遇', color: '#0f766e' },
      ]
    },
  ];

  // PPT单页版式数据
  const pptSingleTemplates = [
    { id: 1, name: '封面页304-昂楷科技解决方案', views: '1W', thumbnail: '🌆', type: 'cover', previewContent: { title: '数据安全解决方案', subtitle: '昂楷科技', color: '#1e40af' } },
    { id: 2, name: '封面页303-昂楷科技解决方案', views: '2417', thumbnail: '⚽', type: 'cover', previewContent: { title: '智能运维平台', subtitle: 'Smart Operations', color: '#047857' } },
    { id: 3, name: '封面页302-昂楷科技解决方案', views: '1.1W', thumbnail: '🌾', type: 'cover', previewContent: { title: '企业数字化转型', subtitle: 'Digital Transformation', color: '#b45309' } },
    { id: 4, name: '封面页301-昂楷科技解决方案', views: '6265', thumbnail: '📖', type: 'cover', previewContent: { title: '年度工作汇报', subtitle: '2024 Annual Report', color: '#7c3aed' } },
    { id: 5, name: '封面页300-昂楷科技解决方案', views: '4780', thumbnail: '🎯', type: 'cover', previewContent: { title: '战略规划方案', subtitle: 'Strategic Planning', color: '#dc2626' } },
    { id: 6, name: '一段内容页036-昂楷科技解决方案', views: '2613', thumbnail: '🏢', type: 'paragraph', previewContent: { title: '公司简介', content: '昂楷科技成立于2010年，是国内领先的数据安全服务商，专注于为企业提供全方位的数据保护解决方案。', color: '#0891b2' } },
    { id: 7, name: '一段内容页035-昂楷科技解决方案', views: '1217', thumbnail: '🏯', type: 'paragraph', previewContent: { title: '核心优势', content: '• 10年+行业经验\n• 500+成功案例\n• 7x24小时服务', color: '#ea580c' } },
    { id: 8, name: '一段内容页034-昂楷科技解决方案', views: '2186', thumbnail: '📱', type: 'paragraph', previewContent: { title: '服务范围', content: '数据加密、访问控制、安全审计、风险评估、合规咨询', color: '#4f46e5' } },
    { id: 9, name: '产品展示页032-昂楷科技解决方案', views: '236', thumbnail: '💻', type: 'image', previewContent: { title: '产品展示', content: '昂楷数据安全平台 V3.0', color: '#0d9488' } },
    { id: 10, name: '产品展示页031-昂楷科技解决方案', views: '2076', thumbnail: '🏗️', type: 'image', previewContent: { title: '解决方案架构', content: '分布式部署 · 高可用设计', color: '#6366f1' } },
    { id: 11, name: '时间轴页042-昂楷科技解决方案', views: '2951', thumbnail: '📅', type: 'logic', previewContent: { title: '发展历程', content: '2010 创立\n2015 A轮融资\n2020 上市\n2024 国际化', color: '#8b5cf6' } },
    { id: 12, name: '时间轴页026-昂楷科技解决方案', views: '2082', thumbnail: '📈', type: 'logic', previewContent: { title: '项目里程碑', content: 'Q1 需求分析\nQ2 开发测试\nQ3 试运行\nQ4 正式上线', color: '#059669' } },
    { id: 13, name: '数据图表页066-昂楷科技解决方案', views: '651', thumbnail: '📊', type: 'chart', previewContent: { title: '销售数据', content: '月度销售趋势图\n环比增长 23%', color: '#dc2626' } },
    { id: 14, name: '数据图表页065-昂楷科技解决方案', views: '1814', thumbnail: '📉', type: 'chart', previewContent: { title: '市场份额', content: '饼图展示\n市场占有率 18.6%', color: '#f59e0b' } },
    { id: 15, name: '数据图表页064-昂楷科技解决方案', views: '2126', thumbnail: '🥧', type: 'chart', previewContent: { title: '客户分布', content: '金融 35%\n政府 28%\n企业 37%', color: '#10b981' } },
  ];

  // PPT整套模板分类
  const pptCompleteCategories = [
    { id: 'workplace', name: '职场场景' },
    { id: 'creative', name: '创意主题' },
    { id: 'animation', name: '动画库' },
  ];

  const pptCompleteSubCategories = {
    workplace: [
      { id: 'report', name: '汇报' },
      { id: 'solution', name: '解决方案' },
      { id: 'product', name: '产品' },
      { id: 'annual', name: '年会' },
      { id: 'company', name: '企业介绍' },
    ],
    creative: [
      { id: 'simple', name: '简约' },
      { id: 'tech', name: '科技' },
      { id: 'chinese', name: '中国风' },
      { id: 'cartoon', name: '卡通' },
    ],
    animation: [
      { id: 'basic', name: '基础动画' },
      { id: 'advanced', name: '高级动画' },
    ],
  };

  // PPT单页版式分类
  const pptSingleCategories = [
    { id: 'essential', name: '必备', icon: Star },
    { id: 'paragraph', name: '文段排版', icon: Type },
    { id: 'image', name: '图片排版', icon: ImageIcon },
    { id: 'logic', name: '逻辑图示', icon: GitBranch },
    { id: 'chart', name: '数据图表', icon: PieChart },
    { id: 'article', name: '文章专享', icon: FileText },
  ];

  const pptSingleSubCategories = {
    essential: [
      { id: 'cover', name: '封面' },
      { id: 'toc', name: '目录' },
      { id: 'transition', name: '过渡' },
      { id: 'ending', name: '结尾' },
    ],
    paragraph: [
      { id: '1p', name: '1段' },
      { id: '2p', name: '2段' },
      { id: '3p', name: '3段' },
      { id: '4p', name: '4段' },
      { id: 'multi', name: '多段' },
      { id: 'multiItem', name: '多项' },
    ],
    image: [
      { id: 'product', name: '产品' },
      { id: 'multiImg', name: '多图' },
      { id: 'person', name: '人物' },
      { id: 'screenshot', name: '截图' },
      { id: 'honor', name: '荣誉' },
      { id: 'logo', name: 'logo' },
    ],
    logic: [
      { id: 'timeline', name: '时间轴' },
      { id: 'structure', name: '架构' },
      { id: 'flowchart', name: '逻辑图' },
      { id: 'compare', name: '对比' },
    ],
    chart: [
      { id: 'chartType', name: '图表' },
      { id: 'table', name: '表格' },
      { id: 'data', name: '数据' },
      { id: 'map', name: '地图' },
    ],
    article: [
      { id: 'quote', name: '引用' },
      { id: 'highlight', name: '重点' },
    ],
  };

  // 模拟素材数据 - 支持所有文件类型预览
  const assets = [
    { 
      id: 1, 
      name: 'Ankki 品牌标准色卡', 
      type: 'image', 
      format: 'PNG', 
      size: '2.4 MB', 
      version: '3.2', 
      updatedAt: '2024-01-15', 
      updatedBy: '张设计', 
      category: 'brand', 
      downloads: 234, 
      thumbnail: '🎨', 
      status: 'approved',
      imagePreview: {
        colors: [
          { name: '主色-橙', hex: '#D97757', rgb: '217, 119, 87' },
          { name: '辅色-蓝', hex: '#1E40AF', rgb: '30, 64, 175' },
          { name: '辅色-绿', hex: '#047857', rgb: '4, 120, 87' },
          { name: '中性-深', hex: '#1A1A1A', rgb: '26, 26, 26' },
          { name: '中性-浅', hex: '#F5F4F2', rgb: '245, 244, 242' },
        ]
      }
    },
    { 
      id: 2, 
      name: '2024年度品牌手册', 
      type: 'document', 
      format: 'PDF', 
      size: '18.6 MB', 
      version: '2.0', 
      updatedAt: '2024-01-10', 
      updatedBy: '李经理', 
      category: 'guide', 
      downloads: 567, 
      thumbnail: '📘', 
      status: 'approved',
      pdfPreview: {
        totalPages: 48,
        pages: [
          { num: 1, title: '封面', content: 'Ankki Design\n2024 品牌手册' },
          { num: 2, title: '目录', content: '01 品牌理念\n02 视觉识别\n03 应用规范\n04 品牌资产' },
          { num: 3, title: '品牌理念', content: '我们的使命是为企业提供\n最安全可靠的数据保护方案' },
          { num: 4, title: '核心价值观', content: '创新 · 专业 · 信赖 · 共赢' },
          { num: 5, title: '品牌故事', content: '成立于2010年，昂楷科技始终\n专注于数据安全领域...' },
        ]
      }
    },
    { 
      id: 3, 
      name: '产品宣传PPT模板', 
      type: 'presentation', 
      format: 'PPTX', 
      size: '5.2 MB', 
      version: '1.5', 
      updatedAt: '2024-01-08', 
      updatedBy: '王策划', 
      category: 'template', 
      downloads: 189, 
      thumbnail: '📊', 
      status: 'approved',
      pptPreview: {
        totalSlides: 25,
        slides: [
          { num: 1, title: '封面', content: '昂楷数据安全平台\n产品介绍', color: '#1E40AF' },
          { num: 2, title: '公司简介', content: '国内领先的数据安全服务商\n500+成功案例', color: '#047857' },
          { num: 3, title: '产品概述', content: '全方位数据保护\n一站式安全解决方案', color: '#7C3AED' },
          { num: 4, title: '核心功能', content: '数据加密 | 访问控制\n安全审计 | 风险预警', color: '#DC2626' },
          { num: 5, title: '联系我们', content: 'www.ankki.com\n400-xxx-xxxx', color: '#1E40AF' },
        ]
      }
    },
    { 
      id: 4, 
      name: '企业LOGO矢量文件', 
      type: 'image', 
      format: 'SVG', 
      size: '0.8 MB', 
      version: '4.0', 
      updatedAt: '2024-01-05', 
      updatedBy: '张设计', 
      category: 'brand', 
      downloads: 892, 
      thumbnail: '✨', 
      status: 'approved',
      svgPreview: {
        variants: [
          { name: '标准版', bg: '#ffffff', color: '#D97757' },
          { name: '深色版', bg: '#1A1A1A', color: '#ffffff' },
          { name: '单色版', bg: '#F5F4F2', color: '#1A1A1A' },
        ]
      }
    },
    { 
      id: 5, 
      name: '社交媒体素材包', 
      type: 'archive', 
      format: 'ZIP', 
      size: '45.3 MB', 
      version: '2.1', 
      updatedAt: '2024-01-03', 
      updatedBy: '陈运营', 
      category: 'marketing', 
      downloads: 156, 
      thumbnail: '📱', 
      status: 'approved',
      zipPreview: {
        totalFiles: 36,
        files: [
          { name: '微信公众号封面_01.png', size: '1.2 MB', type: 'image' },
          { name: '微信公众号封面_02.png', size: '1.1 MB', type: 'image' },
          { name: '朋友圈海报_01.jpg', size: '2.3 MB', type: 'image' },
          { name: '朋友圈海报_02.jpg', size: '2.1 MB', type: 'image' },
          { name: '微博配图_01.png', size: '0.8 MB', type: 'image' },
          { name: '微博配图_02.png', size: '0.9 MB', type: 'image' },
          { name: '小红书封面_01.jpg', size: '1.5 MB', type: 'image' },
          { name: '抖音封面_01.jpg', size: '1.8 MB', type: 'image' },
          { name: '使用说明.txt', size: '2 KB', type: 'text' },
        ]
      }
    },
    { 
      id: 6, 
      name: '财务报表模板', 
      type: 'spreadsheet', 
      format: 'XLSX', 
      size: '1.2 MB', 
      version: '1.8', 
      updatedAt: '2024-01-02', 
      updatedBy: '刘财务', 
      category: 'template', 
      downloads: 78, 
      thumbnail: '📈', 
      status: 'approved',
      excelData: {
        sheetName: '2024年度财务报表',
        headers: ['月份', '收入(万元)', '支出(万元)', '利润(万元)', '同比增长'],
        rows: [
          ['1月', '580', '420', '160', '+12%'],
          ['2月', '620', '450', '170', '+15%'],
          ['3月', '750', '520', '230', '+18%'],
          ['4月', '680', '480', '200', '+10%'],
          ['5月', '720', '510', '210', '+14%'],
          ['6月', '890', '580', '310', '+22%'],
        ]
      }
    },
    { 
      id: 7, 
      name: '员工手册', 
      type: 'document', 
      format: 'DOCX', 
      size: '3.5 MB', 
      version: '2.3', 
      updatedAt: '2024-01-01', 
      updatedBy: '人事部', 
      category: 'internal', 
      downloads: 445, 
      thumbnail: '📄', 
      status: 'approved',
      wordPreview: {
        title: '昂楷科技员工手册',
        totalPages: 32,
        sections: [
          { title: '第一章 公司简介', content: '昂楷科技成立于2010年，是国内领先的数据安全服务商。公司总部位于北京，在上海、深圳、成都设有分公司。' },
          { title: '第二章 企业文化', content: '愿景：成为最值得信赖的数据安全专家\n使命：用技术守护数据价值\n价值观：创新、专业、信赖、共赢' },
          { title: '第三章 规章制度', content: '3.1 考勤制度\n工作时间：9:00-18:00\n午休时间：12:00-13:30\n\n3.2 请假制度\n事假需提前1天申请...' },
          { title: '第四章 薪酬福利', content: '4.1 薪资结构\n基本工资 + 绩效奖金 + 项目奖金\n\n4.2 福利待遇\n五险一金、带薪年假、节日福利...' },
        ]
      }
    },
    { 
      id: 8, 
      name: '销售数据统计表', 
      type: 'spreadsheet', 
      format: 'XLSX', 
      size: '2.1 MB', 
      version: '1.0', 
      updatedAt: '2024-01-03', 
      updatedBy: '销售部', 
      category: 'internal', 
      downloads: 234, 
      thumbnail: '💰', 
      status: 'approved',
      excelData: {
        sheetName: 'Q4销售数据',
        headers: ['产品名称', '销售数量', '单价(元)', '销售额(万元)', '区域'],
        rows: [
          ['数据安全平台', '126', '50,000', '630', '华东'],
          ['审计系统', '89', '30,000', '267', '华北'],
          ['加密网关', '215', '15,000', '322.5', '华南'],
          ['访问控制系统', '78', '25,000', '195', '西南'],
          ['风险预警平台', '56', '40,000', '224', '华中'],
        ]
      }
    },
    { 
      id: 9, 
      name: '产品宣传图-主视觉', 
      type: 'image', 
      format: 'JPG', 
      size: '4.8 MB', 
      version: '1.2', 
      updatedAt: '2024-01-06', 
      updatedBy: '张设计', 
      category: 'marketing', 
      downloads: 321, 
      thumbnail: '🖼️', 
      status: 'approved',
      imagePreview: {
        dimensions: '3840 x 2160',
        description: '产品主视觉宣传图，适用于官网首页、宣传册封面等场景',
        colorMode: 'RGB',
      }
    },
    { 
      id: 10, 
      name: '技术白皮书', 
      type: 'document', 
      format: 'PDF', 
      size: '8.2 MB', 
      version: '1.0', 
      updatedAt: '2024-01-04', 
      updatedBy: '技术部', 
      category: 'guide', 
      downloads: 189, 
      thumbnail: '📑', 
      status: 'approved',
      pdfPreview: {
        totalPages: 28,
        pages: [
          { num: 1, title: '封面', content: '数据安全技术白皮书\n昂楷科技 2024' },
          { num: 2, title: '摘要', content: '本白皮书详细介绍了\n昂楷数据安全解决方案的\n技术架构与实现原理' },
          { num: 3, title: '技术架构', content: '采用分布式微服务架构\n支持高可用、高并发场景' },
          { num: 4, title: '核心算法', content: 'AES-256加密算法\n国密SM4算法支持' },
          { num: 5, title: '部署方案', content: '支持私有云、公有云、混合云\n多种部署模式' },
        ]
      }
    },
  ];

  const categories = [
    { id: 'all', name: '全部素材', icon: FolderOpen, count: 156 },
    { id: 'brand', name: '品牌素材', icon: Star, count: 24, children: [
      { id: 'brand-logo', name: 'Logo标志', count: 8 },
      { id: 'brand-color', name: '色卡规范', count: 6 },
      { id: 'brand-font', name: '字体文件', count: 5 },
      { id: 'brand-vi', name: 'VI规范', count: 5 },
    ]},
    { id: 'template', name: '模板文件', icon: FileText, count: 38, children: [
      { id: 'template-word', name: 'Word模板', count: 12 },
      { id: 'template-excel', name: 'Excel模板', count: 15 },
      { id: 'template-contract', name: '合同模板', count: 11 },
    ]},
    { id: 'ppt', name: 'PPT模版', icon: Presentation, count: 520, isSpecial: true, children: [
      { id: 'ppt-complete', name: '整套模板', count: 200, badge: '热门' },
      { id: 'ppt-single', name: '单页版式', count: 320 },
    ]},
    { id: 'guide', name: '规范指南', icon: Bookmark, count: 15, children: [
      { id: 'guide-brand', name: '品牌手册', count: 5 },
      { id: 'guide-design', name: '设计规范', count: 6 },
      { id: 'guide-tech', name: '技术文档', count: 4 },
    ]},
    { id: 'marketing', name: '营销素材', icon: Image, count: 67, children: [
      { id: 'marketing-poster', name: '海报设计', count: 25 },
      { id: 'marketing-banner', name: '横幅广告', count: 20 },
      { id: 'marketing-social', name: '社交媒体', count: 22 },
    ]},
    { id: 'internal', name: '内部文档', icon: Shield, count: 12 },
  ];

  const stats = [
    { label: '总素材数', value: '1,256', change: '+23', icon: FolderOpen },
    { label: '本月下载', value: '3,847', change: '+12%', icon: Download },
    { label: '待审核', value: '8', change: '-3', icon: Clock },
    { label: '活跃用户', value: '89', change: '+5', icon: Users },
  ];

  // 侧边导航
  const Sidebar = () => (
    <aside style={{
      width: 260,
      backgroundColor: theme.bgSecondary,
      borderRight: `1px solid ${theme.border}`,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: '24px 20px',
        borderBottom: `1px solid ${theme.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            background: `linear-gradient(135deg, ${theme.accent}, #e8956d)`,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            fontFamily: "'DM Sans', sans-serif",
          }}>A</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 17, color: theme.text, fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.3px' }}>Ankki Design</div>
            <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>视觉素材管理平台</div>
          </div>
        </div>
      </div>

      {/* 主导航 */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, padding: '0 8px', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>主菜单</div>
          {[
            { id: 'dashboard', name: '工作台', icon: Grid, show: true },
            { id: 'assets', name: '素材库', icon: FolderOpen, show: true },
            { id: 'upload', name: '上传素材', icon: Upload, show: isAdmin },
            { id: 'feedback', name: '功能反馈', icon: MessageSquare, show: true },
          ].filter(item => item.show).map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                marginBottom: 4,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                backgroundColor: currentView === item.id ? theme.accentLight : 'transparent',
                color: currentView === item.id ? theme.accent : theme.textSecondary,
                fontSize: 14,
                fontWeight: currentView === item.id ? 500 : 400,
                transition: 'all 0.15s ease',
              }}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, padding: '0 8px', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>素材分类</div>
          {categories.map(cat => {
            const isExpanded = expandedCategories.includes(cat.id);
            const hasChildren = cat.children && cat.children.length > 0;
            const isActive = selectedCategory === cat.id || (cat.children && cat.children.some(c => c.id === selectedSubCategory));
            
            return (
              <div key={cat.id}>
                <button
                  onClick={() => { 
                    if (hasChildren) {
                      // 切换展开状态
                      setExpandedCategories(prev => 
                        prev.includes(cat.id) 
                          ? prev.filter(id => id !== cat.id) 
                          : [...prev, cat.id]
                      );
                    }
                    setSelectedCategory(cat.id);
                    setSelectedSubCategory(null);
                    setCurrentView(cat.isSpecial ? 'ppt-templates' : 'assets'); 
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    marginBottom: 2,
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    backgroundColor: isActive ? theme.accentLight : 'transparent',
                    color: isActive ? theme.accent : theme.textSecondary,
                    fontSize: 14,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {hasChildren && (
                      <span style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        transition: 'transform 0.2s ease',
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}>
                        <ChevronRight size={14} />
                      </span>
                    )}
                    {!hasChildren && <span style={{ width: 14 }} />}
                    <cat.icon size={18} />
                    {cat.name}
                    {cat.isSpecial && (
                      <span style={{
                        fontSize: 9,
                        padding: '2px 6px',
                        backgroundColor: theme.accent,
                        color: '#fff',
                        borderRadius: 4,
                        fontWeight: 600,
                      }}>NEW</span>
                    )}
                  </span>
                  <span style={{ fontSize: 11, color: theme.textMuted, backgroundColor: theme.tagBg, padding: '2px 8px', borderRadius: 10 }}>{cat.count}</span>
                </button>
                
                {/* 子分类 */}
                {hasChildren && isExpanded && (
                  <div style={{ 
                    marginLeft: 24, 
                    marginBottom: 4,
                    borderLeft: `2px solid ${theme.border}`,
                    paddingLeft: 12,
                  }}>
                    {cat.children.map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => { 
                          setSelectedCategory(cat.id);
                          setSelectedSubCategory(sub.id);
                          if (sub.id === 'ppt-complete') {
                            setPptTab('complete');
                            setCurrentView('ppt-templates');
                          } else if (sub.id === 'ppt-single') {
                            setPptTab('single');
                            setCurrentView('ppt-templates');
                          } else {
                            setCurrentView('assets');
                          }
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          marginBottom: 2,
                          border: 'none',
                          borderRadius: 6,
                          cursor: 'pointer',
                          backgroundColor: selectedSubCategory === sub.id ? theme.accentLight : 'transparent',
                          color: selectedSubCategory === sub.id ? theme.accent : theme.textMuted,
                          fontSize: 13,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Folder size={14} />
                          {sub.name}
                          {sub.badge && (
                            <span style={{
                              fontSize: 9,
                              padding: '1px 5px',
                              backgroundColor: '#ef4444',
                              color: '#fff',
                              borderRadius: 3,
                              fontWeight: 500,
                            }}>{sub.badge}</span>
                          )}
                        </span>
                        <span style={{ fontSize: 11, color: theme.textMuted }}>{sub.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, padding: '0 8px', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>管理后台</div>
          {[
            { id: 'admin-users', name: '用户管理', icon: Users, permission: 'admin' },
            { id: 'admin-audit', name: '审核管理', icon: Shield, permission: 'admin' },
            { id: 'admin-feedback', name: '反馈管理', icon: MessageSquare, permission: 'admin' },
            { id: 'admin-stats', name: '数据统计', icon: BarChart3, permission: 'admin' },
            { id: 'admin-settings', name: '系统设置', icon: Settings, permission: 'superadmin' },
          ].filter(item => item.permission === 'admin' ? isAdmin : isSuperAdmin).map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                marginBottom: 4,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                backgroundColor: currentView === item.id ? theme.accentLight : 'transparent',
                color: currentView === item.id ? theme.accent : theme.textSecondary,
                fontSize: 14,
                transition: 'all 0.15s ease',
              }}
            >
              <item.icon size={18} />
              {item.name}
              {item.permission === 'superadmin' && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 9,
                  padding: '2px 6px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  borderRadius: 4,
                  fontWeight: 600,
                }}>超管</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* 底部用户信息 */}
      <div style={{
        padding: '16px 12px',
        borderTop: `1px solid ${theme.border}`,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 12px',
          borderRadius: 10,
          backgroundColor: theme.bgTertiary,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: isSuperAdmin ? 'linear-gradient(135deg, #ef4444, #f97316)' : isAdmin ? 'linear-gradient(135deg, #8b5cf6, #a78bfa)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
            }}>{currentUser.name[0]}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: theme.text }}>{currentUser.name}</div>
              <div style={{ fontSize: 10, color: isSuperAdmin ? '#ef4444' : isAdmin ? '#8b5cf6' : theme.textMuted, fontWeight: 500 }}>
                {isSuperAdmin ? '超级管理员' : isAdmin ? '管理员' : '普通用户'}
              </div>
            </div>
          </div>
          <LogOut size={18} style={{ color: theme.textMuted, cursor: 'pointer' }} />
        </div>
      </div>
    </aside>
  );

  // 顶部导航
  const TopBar = () => (
    <header style={{
      height: 64,
      backgroundColor: theme.bgSecondary,
      borderBottom: `1px solid ${theme.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        backgroundColor: theme.bgTertiary,
        padding: '10px 16px',
        borderRadius: 10,
        width: 400,
        border: `1px solid ${theme.border}`,
      }}>
        <Search size={18} style={{ color: theme.textMuted }} />
        <input
          type="text"
          placeholder="搜索素材名称、标签、上传者..."
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            outline: 'none',
            width: '100%',
            fontSize: 14,
            color: theme.text,
          }}
        />
        <span style={{ fontSize: 11, color: theme.textMuted, backgroundColor: theme.bg, padding: '3px 8px', borderRadius: 5 }}>⌘K</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {isAdmin && (
          <button
            onClick={() => setCurrentView('upload')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              backgroundColor: theme.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <Plus size={18} />
            上传素材
          </button>
        )}

        {/* 角色切换器 - 用于演示 */}
        <div style={{ position: 'relative' }}>
          <select
            value={currentUser.role}
            onChange={(e) => {
              const roles = {
                superadmin: { id: 1, name: '系统管理员', email: 'superadmin@ankki.com', role: 'superadmin' },
                admin: { id: 2, name: '张管理', email: 'zhangadmin@ankki.com', role: 'admin' },
                user: { id: 3, name: '王用户', email: 'wanguser@ankki.com', role: 'user' },
              };
              setCurrentUser(roles[e.target.value]);
              setCurrentView('dashboard');
            }}
            style={{
              padding: '8px 32px 8px 12px',
              backgroundColor: isSuperAdmin ? 'rgba(239, 68, 68, 0.1)' : isAdmin ? 'rgba(139, 92, 246, 0.1)' : theme.bgTertiary,
              border: `1px solid ${isSuperAdmin ? 'rgba(239, 68, 68, 0.3)' : isAdmin ? 'rgba(139, 92, 246, 0.3)' : theme.border}`,
              borderRadius: 8,
              color: isSuperAdmin ? '#ef4444' : isAdmin ? '#8b5cf6' : theme.text,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
            }}
          >
            <option value="superadmin">🔴 超级管理员</option>
            <option value="admin">🟣 管理员</option>
            <option value="user">⚪ 普通用户</option>
          </select>
        </div>

        <div style={{ width: 1, height: 24, backgroundColor: theme.border }} />

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.bgTertiary,
            border: `1px solid ${theme.border}`,
            borderRadius: 10,
            cursor: 'pointer',
            color: theme.textSecondary,
          }}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div style={{ position: 'relative' }}>
          <button style={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.bgTertiary,
            border: `1px solid ${theme.border}`,
            borderRadius: 10,
            cursor: 'pointer',
            color: theme.textSecondary,
          }}>
            <Bell size={18} />
          </button>
          <span style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 8,
            height: 8,
            backgroundColor: theme.accent,
            borderRadius: '50%',
          }} />
        </div>
      </div>
    </header>
  );

  // PPT模版库视图
  const PPTTemplatesView = () => (
    <div style={{ padding: 28 }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: theme.text, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
          PPT模版库
        </h2>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>精选高质量PPT模板，助力高效办公</p>
      </div>

      {/* 主Tab切换 */}
      <div style={{
        display: 'flex',
        gap: 32,
        borderBottom: `1px solid ${theme.border}`,
        marginBottom: 24,
      }}>
        <button
          onClick={() => setPptTab('complete')}
          style={{
            padding: '12px 0',
            fontSize: 16,
            fontWeight: 500,
            color: pptTab === 'complete' ? theme.accent : theme.textSecondary,
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: pptTab === 'complete' ? `2px solid ${theme.accent}` : '2px solid transparent',
            cursor: 'pointer',
            marginBottom: -1,
          }}
        >
          PPT定制模板库（整套）
        </button>
        <button
          onClick={() => setPptTab('single')}
          style={{
            padding: '12px 0',
            fontSize: 16,
            fontWeight: 500,
            color: pptTab === 'single' ? theme.accent : theme.textSecondary,
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: pptTab === 'single' ? `2px solid ${theme.accent}` : '2px solid transparent',
            cursor: 'pointer',
            marginBottom: -1,
          }}
        >
          PPT创意版式库（单页）
        </button>
      </div>

      {pptTab === 'complete' ? (
        // 整套模板库
        <div>
          <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 20 }}>所有案例均为原创PPT模板</p>
          
          {/* 一级分类 */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
            {pptCompleteCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setPptCompleteCategory(cat.id); setPptCompleteSubCategory(pptCompleteSubCategories[cat.id][0].id); }}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: pptCompleteCategory === cat.id ? theme.accent : theme.textSecondary,
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* 二级分类标签 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {pptCompleteSubCategories[pptCompleteCategory]?.map(sub => (
              <button
                key={sub.id}
                onClick={() => setPptCompleteSubCategory(sub.id)}
                style={{
                  padding: '8px 20px',
                  fontSize: 13,
                  fontWeight: 400,
                  color: pptCompleteSubCategory === sub.id ? theme.accent : theme.textSecondary,
                  backgroundColor: pptCompleteSubCategory === sub.id ? theme.accentLight : theme.tagBg,
                  border: pptCompleteSubCategory === sub.id ? `1px solid ${theme.accent}` : `1px solid transparent`,
                  borderRadius: 20,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* 模板网格 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {pptCompleteTemplates.map(template => (
              <div
                key={template.id}
                onClick={() => { setPreviewPPT(template); setPreviewPage(0); }}
                style={{
                  backgroundColor: theme.cardBg,
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: `1px solid ${theme.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* 缩略图 */}
                <div style={{
                  position: 'relative',
                  height: 160,
                  background: `linear-gradient(135deg, ${darkMode ? '#2a3f5f' : '#e8f4fc'}, ${darkMode ? '#1e3a5f' : '#d1e9f6'})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <span style={{ fontSize: 48 }}>{template.thumbnail}</span>
                  {template.tag && (
                    <span style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      padding: '4px 10px',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#fff',
                      backgroundColor: template.tag === '热门' ? '#ef4444' : theme.accent,
                      borderRadius: 4,
                    }}>{template.tag}</span>
                  )}
                  <span style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    padding: '4px 8px',
                    fontSize: 10,
                    fontWeight: 500,
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: 4,
                  }}>点击预览</span>
                </div>

                {/* 信息 */}
                <div style={{ padding: 16 }}>
                  <h4 style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: theme.text,
                    marginBottom: 6,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>{template.name}</h4>
                  <p style={{
                    fontSize: 12,
                    color: theme.textMuted,
                    marginBottom: 12,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>{template.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: theme.textMuted }}>{template.views}人阅读</span>
                    <span style={{ fontSize: 12, color: theme.accent, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Download size={12} />
                      下载
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // 单页版式库
        <div>
          <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 20 }}>每一页都是精品</p>
          
          {/* 一级分类 */}
          <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
            {pptSingleCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setPptSingleCategory(cat.id); setPptSingleSubCategory(pptSingleSubCategories[cat.id][0].id); }}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: pptSingleCategory === cat.id ? theme.accent : theme.textSecondary,
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: pptSingleCategory === cat.id ? `2px solid ${theme.accent}` : '2px solid transparent',
                  cursor: 'pointer',
                  padding: '8px 0',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* 二级分类标签 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {pptSingleSubCategories[pptSingleCategory]?.map(sub => (
              <button
                key={sub.id}
                onClick={() => setPptSingleSubCategory(sub.id)}
                style={{
                  padding: '8px 20px',
                  fontSize: 13,
                  fontWeight: 400,
                  color: pptSingleSubCategory === sub.id ? theme.accent : theme.textSecondary,
                  backgroundColor: pptSingleSubCategory === sub.id ? theme.accentLight : theme.tagBg,
                  border: pptSingleSubCategory === sub.id ? `1px solid ${theme.accent}` : `1px solid transparent`,
                  borderRadius: 20,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* 模板网格 - 5列 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {pptSingleTemplates.map(template => (
              <div
                key={template.id}
                onClick={() => { setPreviewPPT(template); setPreviewPage(0); }}
                style={{
                  backgroundColor: theme.cardBg,
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: `1px solid ${theme.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* 缩略图 */}
                <div style={{
                  position: 'relative',
                  height: 120,
                  background: `linear-gradient(135deg, ${darkMode ? '#2d3748' : '#f0f4f8'}, ${darkMode ? '#1a202c' : '#e2e8f0'})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <span style={{ fontSize: 36 }}>{template.thumbnail}</span>
                  <span style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 6,
                    padding: '3px 6px',
                    fontSize: 9,
                    fontWeight: 500,
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: 3,
                  }}>点击预览</span>
                </div>

                {/* 信息 */}
                <div style={{ padding: 12 }}>
                  <h4 style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: theme.text,
                    marginBottom: 8,
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: 34,
                  }}>{template.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: theme.textMuted }}>{template.views}人阅读</span>
                    <span style={{ fontSize: 12, color: theme.accent, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Download size={11} />
                      下载
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // 工作台视图
  const DashboardView = () => (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: theme.text, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
          早上好，{currentUser.name} 👋
        </h1>
        <p style={{ fontSize: 15, color: theme.textSecondary }}>
          欢迎回到 Ankki Design 素材管理平台
          {isSuperAdmin && '，您拥有最高管理权限'}
          {isAdmin && !isSuperAdmin && '，您可以管理素材和审核内容'}
          {!isAdmin && '，您可以浏览和下载素材'}
        </p>
      </div>

      {/* 当前角色提示 */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        backgroundColor: isSuperAdmin ? 'rgba(239, 68, 68, 0.1)' : isAdmin ? 'rgba(139, 92, 246, 0.1)' : theme.bgTertiary,
        borderRadius: 20,
        marginBottom: 24,
      }}>
        <Shield size={16} color={isSuperAdmin ? '#ef4444' : isAdmin ? '#8b5cf6' : theme.textSecondary} />
        <span style={{ fontSize: 13, fontWeight: 500, color: isSuperAdmin ? '#ef4444' : isAdmin ? '#8b5cf6' : theme.textSecondary }}>
          {isSuperAdmin ? '超级管理员' : isAdmin ? '管理员' : '普通用户'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            backgroundColor: theme.cardBg,
            borderRadius: 14,
            padding: 24,
            border: `1px solid ${theme.border}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: theme.accentLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.accent,
              }}>
                <stat.icon size={22} />
              </div>
              <span style={{
                fontSize: 12,
                color: stat.change.includes('+') ? theme.success : theme.warning,
                backgroundColor: stat.change.includes('+') ? (darkMode ? 'rgba(74, 222, 128, 0.15)' : 'rgba(74, 222, 128, 0.1)') : (darkMode ? 'rgba(251, 191, 36, 0.15)' : 'rgba(251, 191, 36, 0.1)'),
                padding: '4px 10px',
                borderRadius: 20,
                fontWeight: 500,
              }}>{stat.change}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: theme.text, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: theme.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* PPT模版推荐卡片 */}
      <div style={{
        backgroundColor: `linear-gradient(135deg, ${theme.accent}, #e8956d)`,
        background: `linear-gradient(135deg, ${theme.accent}, #e8956d)`,
        borderRadius: 16,
        padding: 28,
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 8 }}>🎉 PPT模版库全新上线</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>520+ 精选模板，涵盖职场场景、创意主题、数据图表等多个分类</p>
          <button
            onClick={() => { setSelectedCategory('ppt'); setCurrentView('ppt-templates'); }}
            style={{
              padding: '10px 24px',
              backgroundColor: '#fff',
              color: theme.accent,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            立即查看
          </button>
        </div>
        <div style={{ fontSize: 64 }}>📊</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div style={{
          backgroundColor: theme.cardBg,
          borderRadius: 14,
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '18px 24px',
            borderBottom: `1px solid ${theme.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>最近更新</h3>
            <button style={{
              fontSize: 13,
              color: theme.accent,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              查看全部 <ChevronRight size={16} />
            </button>
          </div>
          <div>
            {assets.slice(0, 5).map((asset, i) => (
              <div
                key={asset.id}
                onClick={() => setPreviewAsset(asset)}
                style={{
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: i < 4 ? `1px solid ${theme.border}` : 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: theme.bgTertiary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}>{asset.thumbnail}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: theme.text, marginBottom: 4 }}>{asset.name}</div>
                    <div style={{ fontSize: 12, color: theme.textMuted, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{asset.format}</span>
                      <span>·</span>
                      <span>{asset.size}</span>
                      <span>·</span>
                      <span>v{asset.version}</span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>{asset.updatedAt}</div>
                  <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>{asset.updatedBy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: theme.cardBg,
          borderRadius: 14,
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '18px 24px',
            borderBottom: `1px solid ${theme.border}`,
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>热门PPT模板</h3>
          </div>
          <div style={{ padding: '8px 16px' }}>
            {pptCompleteTemplates.slice(0, 4).map((template, i) => (
              <div key={template.id} style={{
                padding: '14px 8px',
                borderBottom: i < 3 ? `1px solid ${theme.border}` : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <span style={{ fontSize: 24 }}>{template.thumbnail}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: theme.text, fontWeight: 500, marginBottom: 2 }}>{template.name.substring(0, 15)}...</div>
                  <div style={{ fontSize: 11, color: theme.textMuted }}>{template.views}人阅读</div>
                </div>
                <span style={{ fontSize: 12, color: theme.accent, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Download size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 素材库视图
  const AssetsView = () => {
    // 获取当前分类信息
    const currentCategory = categories.find(c => c.id === selectedCategory);
    const currentSubCategory = currentCategory?.children?.find(s => s.id === selectedSubCategory);
    
    // 筛选素材
    const filteredAssets = assets.filter(a => {
      if (selectedCategory === 'all') return true;
      if (selectedSubCategory) {
        // 如果选中了子分类，根据子分类筛选（这里简化处理）
        return a.category === selectedCategory || a.category === selectedSubCategory.split('-')[0];
      }
      return a.category === selectedCategory;
    });

    return (
    <div style={{ padding: 28 }}>
      {/* 面包屑导航 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 8, 
        marginBottom: 16,
        fontSize: 13,
        color: theme.textMuted,
      }}>
        <span 
          style={{ cursor: 'pointer' }}
          onClick={() => { setSelectedCategory('all'); setSelectedSubCategory(null); }}
        >全部素材</span>
        {selectedCategory !== 'all' && (
          <>
            <ChevronRight size={14} />
            <span 
              style={{ color: selectedSubCategory ? theme.textMuted : theme.text, cursor: 'pointer' }}
              onClick={() => setSelectedSubCategory(null)}
            >{currentCategory?.name}</span>
          </>
        )}
        {selectedSubCategory && currentSubCategory && (
          <>
            <ChevronRight size={14} />
            <span style={{ color: theme.text }}>{currentSubCategory.name}</span>
          </>
        )}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
            {currentSubCategory?.name || currentCategory?.name || '全部素材'}
          </h2>
          <p style={{ fontSize: 14, color: theme.textSecondary }}>
            共 {filteredAssets.length} 个素材
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            backgroundColor: theme.bgTertiary,
            border: `1px solid ${theme.border}`,
            borderRadius: 8,
            cursor: 'pointer',
            color: theme.textSecondary,
            fontSize: 14,
          }}>
            <Filter size={16} />
            筛选
          </button>
          <div style={{
            display: 'flex',
            backgroundColor: theme.bgTertiary,
            borderRadius: 8,
            border: `1px solid ${theme.border}`,
            overflow: 'hidden',
          }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: viewMode === 'grid' ? theme.accent : 'transparent',
                color: viewMode === 'grid' ? '#fff' : theme.textSecondary,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: viewMode === 'list' ? theme.accent : 'transparent',
                color: viewMode === 'list' ? '#fff' : theme.textSecondary,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 子分类标签（如果有） */}
      {currentCategory?.children && !selectedSubCategory && (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 10, 
          marginBottom: 24,
          padding: 16,
          backgroundColor: theme.bgTertiary,
          borderRadius: 10,
        }}>
          <span style={{ fontSize: 13, color: theme.textMuted, marginRight: 8 }}>子分类：</span>
          {currentCategory.children.map(sub => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubCategory(sub.id)}
              style={{
                padding: '6px 14px',
                fontSize: 13,
                backgroundColor: selectedSubCategory === sub.id ? theme.accent : theme.cardBg,
                color: selectedSubCategory === sub.id ? '#fff' : theme.textSecondary,
                border: `1px solid ${selectedSubCategory === sub.id ? theme.accent : theme.border}`,
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              {sub.name}
              <span style={{ 
                marginLeft: 6, 
                fontSize: 11, 
                opacity: 0.7 
              }}>({sub.count})</span>
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {filteredAssets.map(asset => (
          <div
            key={asset.id}
            onClick={() => setPreviewAsset(asset)}
            style={{
              backgroundColor: theme.cardBg,
              borderRadius: 14,
              border: `1px solid ${theme.border}`,
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <div style={{
              height: 140,
              backgroundColor: theme.bgTertiary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              position: 'relative',
            }}>
              {asset.thumbnail}
              <span style={{
                position: 'absolute',
                top: 10,
                right: 10,
                fontSize: 10,
                fontWeight: 600,
                color: '#fff',
                backgroundColor: asset.status === 'approved' ? theme.success : theme.warning,
                padding: '3px 8px',
                borderRadius: 4,
              }}>
                {asset.status === 'approved' ? '已发布' : '待审核'}
              </span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: theme.text, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <span style={{
                  fontSize: 11,
                  padding: '3px 8px',
                  backgroundColor: theme.bgTertiary,
                  borderRadius: 4,
                  color: theme.textSecondary,
                }}>{asset.format}</span>
                <span style={{
                  fontSize: 11,
                  padding: '3px 8px',
                  backgroundColor: theme.accentLight,
                  borderRadius: 4,
                  color: theme.accent,
                }}>v{asset.version}</span>
              </div>
              {/* 上传者信息 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 10, fontWeight: 600,
                }}>{asset.updatedBy[0]}</div>
                <span style={{ fontSize: 12, color: theme.textSecondary }}>{asset.updatedBy}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: theme.textMuted }}>{asset.updatedAt}</span>
                <span style={{ fontSize: 11, color: theme.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Download size={12} /> {asset.downloads}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  };

  // 上传素材视图
  const UploadView = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [assetName, setAssetName] = useState('');
    const [mainCategory, setMainCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [version, setVersion] = useState('1.0');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = React.useRef(null);

    // 分类层级数据 - 与侧边栏菜单对应
    const categoryTree = {
      'brand': { name: '品牌素材', icon: '🎨', subs: [
        { id: 'logo', name: 'Logo标志' },
        { id: 'color', name: '色卡规范' },
        { id: 'font', name: '字体文件' },
        { id: 'vi', name: 'VI规范' },
      ]},
      'template': { name: '模板文件', icon: '📄', subs: [
        { id: 'ppt', name: 'PPT模板' },
        { id: 'word', name: 'Word模板' },
        { id: 'excel', name: 'Excel模板' },
        { id: 'contract', name: '合同模板' },
      ]},
      'ppt-complete': { name: 'PPT定制模板（整套）', icon: '📊', subs: [
        { id: 'report', name: '汇报' },
        { id: 'solution', name: '解决方案' },
        { id: 'product', name: '产品' },
        { id: 'annual', name: '年会' },
        { id: 'company', name: '企业介绍' },
      ]},
      'ppt-single': { name: 'PPT创意版式（单页）', icon: '📑', subs: [
        { id: 'cover', name: '封面' },
        { id: 'catalog', name: '目录' },
        { id: 'transition', name: '过渡页' },
        { id: 'ending', name: '结尾页' },
        { id: 'content-1', name: '一段内容' },
        { id: 'content-2', name: '两段内容' },
        { id: 'content-multi', name: '多段内容' },
        { id: 'image-product', name: '产品展示' },
        { id: 'image-multi', name: '多图排版' },
        { id: 'timeline', name: '时间轴' },
        { id: 'structure', name: '架构图' },
        { id: 'chart', name: '数据图表' },
        { id: 'table', name: '表格' },
      ]},
      'marketing': { name: '营销素材', icon: '📢', subs: [
        { id: 'poster', name: '海报' },
        { id: 'banner', name: '横幅广告' },
        { id: 'social', name: '社交媒体' },
        { id: 'video', name: '视频素材' },
      ]},
      'guide': { name: '规范指南', icon: '📘', subs: [
        { id: 'brand-guide', name: '品牌手册' },
        { id: 'design-guide', name: '设计规范' },
        { id: 'tech-doc', name: '技术文档' },
        { id: 'user-manual', name: '用户手册' },
      ]},
    };

    const handleFileSelect = (e) => {
      const files = Array.from(e.target.files);
      const fileInfos = files.map(file => ({
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        extension: file.name.split('.').pop().toUpperCase(),
      }));
      setSelectedFiles([...selectedFiles, ...fileInfos]);
      
      // 自动填充素材名称（如果为空）
      if (!assetName && files.length > 0) {
        const firstFileName = files[0].name.replace(/\.[^/.]+$/, '');
        setAssetName(firstFileName);
      }
    };

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const removeFile = (index) => {
      setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    };

    const getFileIcon = (extension) => {
      const icons = {
        'PDF': '📕', 'DOCX': '📘', 'DOC': '📘', 'XLSX': '📗', 'XLS': '📗',
        'PPTX': '📙', 'PPT': '📙', 'PNG': '🖼️', 'JPG': '🖼️', 'JPEG': '🖼️',
        'SVG': '🎨', 'ZIP': '📦', 'RAR': '📦',
      };
      return icons[extension] || '📄';
    };

    const handleSubmit = () => {
      if (selectedFiles.length > 0 && assetName && mainCategory && subCategory) {
        setUploading(true);
        setTimeout(() => {
          setUploading(false);
          setUploadSuccess(true);
          setTimeout(() => {
            setUploadSuccess(false);
            setSelectedFiles([]);
            setAssetName('');
            setMainCategory('');
            setSubCategory('');
            setVersion('1.0');
            setDescription('');
          }, 3000);
        }, 2000);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      const fileInfos = files.map(file => ({
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        extension: file.name.split('.').pop().toUpperCase(),
      }));
      setSelectedFiles([...selectedFiles, ...fileInfos]);
      if (!assetName && files.length > 0) {
        setAssetName(files[0].name.replace(/\.[^/.]+$/, ''));
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    return (
      <div style={{ padding: 28, maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 8 }}>上传素材</h2>
          <p style={{ fontSize: 14, color: theme.textSecondary }}>上传新的品牌素材供团队使用</p>
        </div>

        {/* 上传者信息 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: 16,
          backgroundColor: theme.bgTertiary,
          borderRadius: 10,
          marginBottom: 24,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: isSuperAdmin ? 'linear-gradient(135deg, #ef4444, #f97316)' : 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 14, fontWeight: 600,
          }}>{currentUser.name[0]}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>上传者：{currentUser.name}</div>
            <div style={{ fontSize: 12, color: theme.textMuted }}>{currentUser.email} · {isSuperAdmin ? '超级管理员' : '管理员'}</div>
          </div>
        </div>

        {/* 文件上传区域 */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            border: `2px dashed ${selectedFiles.length > 0 ? theme.accent : theme.border}`,
            borderRadius: 16,
            padding: selectedFiles.length > 0 ? 24 : 48,
            textAlign: 'center',
            marginBottom: 24,
            backgroundColor: selectedFiles.length > 0 ? theme.accentLight : theme.cardBg,
            transition: 'all 0.2s ease',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".docx,.doc,.xlsx,.xls,.pptx,.ppt,.pdf,.png,.jpg,.jpeg,.svg,.zip,.rar"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {selectedFiles.length === 0 ? (
            <>
              <div style={{
                width: 72, height: 72, borderRadius: 16, backgroundColor: theme.accentLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', color: theme.accent,
              }}>
                <Upload size={32} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 500, color: theme.text, marginBottom: 8 }}>拖拽文件到此处上传</div>
              <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 20 }}>支持 DOCX、XLSX、PPTX、JPG、PNG、PDF、SVG、ZIP 等格式</div>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '12px 28px', backgroundColor: theme.accent, color: '#fff',
                  border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500,
                }}
              >选择文件</button>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 16 }}>
                {selectedFiles.map((file, index) => (
                  <div key={index} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', backgroundColor: theme.cardBg, borderRadius: 10,
                    marginBottom: 8, border: `1px solid ${theme.border}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 28 }}>{getFileIcon(file.extension)}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>{file.name}</div>
                        <div style={{ fontSize: 12, color: theme.textMuted }}>{file.extension} · {file.size}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      style={{
                        width: 28, height: 28, borderRadius: '50%', backgroundColor: 'rgba(239,68,68,0.1)',
                        border: 'none', cursor: 'pointer', color: '#ef4444',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '10px 20px', backgroundColor: 'transparent', color: theme.accent,
                  border: `1px solid ${theme.accent}`, borderRadius: 8, cursor: 'pointer', fontSize: 13,
                }}
              >+ 继续添加文件</button>
            </>
          )}
        </div>

        {/* 素材信息表单 */}
        <div style={{
          backgroundColor: theme.cardBg, borderRadius: 14,
          border: `1px solid ${theme.border}`, padding: 28,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text, marginBottom: 24 }}>素材信息</h3>
          
          {/* 素材名称 */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>素材名称 *</label>
            <input
              type="text"
              placeholder="输入素材名称"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                borderRadius: 8, backgroundColor: theme.bg, color: theme.text,
                fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* 分类选择 - 两级 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>一级分类 *</label>
              <select
                value={mainCategory}
                onChange={(e) => { setMainCategory(e.target.value); setSubCategory(''); }}
                style={{
                  width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                  borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none',
                }}
              >
                <option value="">选择一级分类</option>
                {Object.entries(categoryTree).map(([key, cat]) => (
                  <option key={key} value={key}>{cat.icon} {cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>二级分类 *</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                disabled={!mainCategory}
                style={{
                  width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                  borderRadius: 8, backgroundColor: mainCategory ? theme.bg : theme.bgTertiary,
                  color: mainCategory ? theme.text : theme.textMuted, fontSize: 14, outline: 'none',
                }}
              >
                <option value="">{mainCategory ? '选择二级分类' : '请先选择一级分类'}</option>
                {mainCategory && categoryTree[mainCategory]?.subs.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 版本号 */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>版本号 *</label>
            <input
              type="text"
              placeholder="例如: 1.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              style={{
                width: 200, padding: '12px 16px', border: `1px solid ${theme.border}`,
                borderRadius: 8, backgroundColor: theme.bg, color: theme.text,
                fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* 使用规范说明 */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>使用规范说明</label>
            <textarea
              placeholder="描述该素材的使用场景和规范要求..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                borderRadius: 8, backgroundColor: theme.bg, color: theme.text,
                fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6,
              }}
            />
          </div>

          {/* 提交状态 */}
          {uploadSuccess && (
            <div style={{
              padding: 16, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', backgroundColor: '#10b981',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={22} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#10b981' }}>上传成功！</div>
                <div style={{ fontSize: 13, color: theme.textSecondary }}>素材已提交审核，审核通过后将显示在素材库中</div>
              </div>
            </div>
          )}

          {/* 提交按钮 */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={handleSubmit}
              disabled={uploading || selectedFiles.length === 0 || !assetName || !mainCategory || !subCategory}
              style={{
                flex: 1, padding: '14px',
                backgroundColor: (selectedFiles.length > 0 && assetName && mainCategory && subCategory) ? theme.accent : theme.bgTertiary,
                color: (selectedFiles.length > 0 && assetName && mainCategory && subCategory) ? '#fff' : theme.textMuted,
                border: 'none', borderRadius: 8,
                cursor: (selectedFiles.length > 0 && assetName && mainCategory && subCategory) ? 'pointer' : 'not-allowed',
                fontSize: 14, fontWeight: 500,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {uploading ? (
                <>
                  <span style={{ width: 18, height: 18, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  上传中...
                </>
              ) : '提交审核'}
            </button>
            <button style={{
              padding: '14px 28px', backgroundColor: 'transparent', color: theme.textSecondary,
              border: `1px solid ${theme.border}`, borderRadius: 8, cursor: 'pointer', fontSize: 14,
            }}>保存草稿</button>
          </div>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  };

  // 用户管理
  const AdminUsersView = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [activeTab, setActiveTab] = useState('all'); // all, admin, user
    
    const users = [
      { id: 1, name: '系统管理员', email: 'superadmin@ankki.com', role: 'superadmin', department: '技术部', uploads: 156, lastActive: '2024-01-15', status: 'active', createdBy: '系统' },
      { id: 2, name: '张管理', email: 'zhangadmin@ankki.com', role: 'admin', department: '设计部', uploads: 89, lastActive: '2024-01-15', status: 'active', createdBy: '系统管理员' },
      { id: 3, name: '李管理', email: 'liadmin@ankki.com', role: 'admin', department: '品牌部', uploads: 67, lastActive: '2024-01-14', status: 'active', createdBy: '系统管理员' },
      { id: 4, name: '张设计', email: 'zhang@ankki.com', role: 'user', department: '设计部', uploads: 45, lastActive: '2024-01-15', status: 'active', createdBy: '张管理' },
      { id: 5, name: '李经理', email: 'li@ankki.com', role: 'user', department: '品牌部', uploads: 23, lastActive: '2024-01-15', status: 'active', createdBy: '李管理' },
      { id: 6, name: '王策划', email: 'wang@ankki.com', role: 'user', department: '市场部', uploads: 18, lastActive: '2024-01-14', status: 'active', createdBy: '张管理' },
      { id: 7, name: '陈运营', email: 'chen@ankki.com', role: 'user', department: '运营部', uploads: 12, lastActive: '2024-01-13', status: 'inactive', createdBy: '李管理' },
    ];

    const getRoleName = (role) => {
      switch(role) {
        case 'superadmin': return '超级管理员';
        case 'admin': return '管理员';
        case 'user': return '普通用户';
        default: return '未知';
      }
    };

    const getRoleColor = (role) => {
      switch(role) {
        case 'superadmin': return { bg: darkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
        case 'admin': return { bg: darkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' };
        case 'user': return { bg: theme.bgTertiary, color: theme.textSecondary };
        default: return { bg: theme.bgTertiary, color: theme.textSecondary };
      }
    };

    const filteredUsers = activeTab === 'all' ? users : 
      activeTab === 'admin' ? users.filter(u => u.role === 'admin' || u.role === 'superadmin') :
      users.filter(u => u.role === 'user');

    // 添加用户弹窗
    const AddUserModal = () => (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }} onClick={() => setShowAddModal(false)}>
        <div style={{
          width: 480,
          backgroundColor: theme.cardBg,
          borderRadius: 16,
          overflow: 'hidden',
        }} onClick={e => e.stopPropagation()}>
          <div style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: theme.text }}>
              {isSuperAdmin ? '添加管理员' : '添加用户'}
            </h3>
            <button onClick={() => setShowAddModal(false)} style={{
              width: 32, height: 32, borderRadius: '50%', backgroundColor: theme.bgTertiary,
              border: 'none', cursor: 'pointer', color: theme.textSecondary, fontSize: 16,
            }}>✕</button>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>姓名 *</label>
              <input type="text" placeholder="请输入姓名" style={{
                width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>邮箱 *</label>
              <input type="email" placeholder="请输入邮箱" style={{
                width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>角色 *</label>
                <select style={{
                  width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                  borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none',
                }}>
                  {isSuperAdmin && <option value="admin">管理员</option>}
                  <option value="user">普通用户</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>部门 *</label>
                <select style={{
                  width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                  borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none',
                }}>
                  <option>技术部</option>
                  <option>设计部</option>
                  <option>品牌部</option>
                  <option>市场部</option>
                  <option>运营部</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>初始密码 *</label>
              <input type="password" placeholder="设置初始密码" style={{
                width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }} />
            </div>
            {isSuperAdmin && (
              <div style={{
                padding: 16,
                backgroundColor: theme.accentLight,
                borderRadius: 8,
                marginBottom: 24,
              }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: theme.accent, marginBottom: 8 }}>💡 管理员权限说明</div>
                <div style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>
                  管理员可以：上传、编辑、删除素材文件，审核内容，查看数据统计。<br/>
                  管理员不能：添加/删除其他管理员，修改系统设置。
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowAddModal(false)} style={{
                flex: 1, padding: '12px', backgroundColor: theme.bgTertiary, color: theme.textSecondary,
                border: `1px solid ${theme.border}`, borderRadius: 8, cursor: 'pointer', fontSize: 14,
              }}>取消</button>
              <button style={{
                flex: 1, padding: '12px', backgroundColor: theme.accent, color: '#fff',
                border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500,
              }}>确认添加</button>
            </div>
          </div>
        </div>
      </div>
    );

    // 删除确认弹窗
    const DeleteConfirmModal = () => (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }} onClick={() => setShowDeleteConfirm(null)}>
        <div style={{
          width: 400,
          backgroundColor: theme.cardBg,
          borderRadius: 16,
          padding: 24,
        }} onClick={e => e.stopPropagation()}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
          }}>
            <Trash2 size={28} color="#ef4444" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: theme.text, textAlign: 'center', marginBottom: 12 }}>
            确认删除{showDeleteConfirm?.role === 'admin' ? '管理员' : '用户'}？
          </h3>
          <p style={{ fontSize: 14, color: theme.textSecondary, textAlign: 'center', marginBottom: 24, lineHeight: 1.6 }}>
            您确定要删除 <strong style={{ color: theme.text }}>{showDeleteConfirm?.name}</strong> 吗？<br/>
            此操作无法撤销，该用户的所有数据将被保留但账号将被禁用。
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setShowDeleteConfirm(null)} style={{
              flex: 1, padding: '12px', backgroundColor: theme.bgTertiary, color: theme.textSecondary,
              border: `1px solid ${theme.border}`, borderRadius: 8, cursor: 'pointer', fontSize: 14,
            }}>取消</button>
            <button style={{
              flex: 1, padding: '12px', backgroundColor: '#ef4444', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500,
            }}>确认删除</button>
          </div>
        </div>
      </div>
    );

    return (
      <div style={{ padding: 28 }}>
        {/* 页面标题 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4 }}>用户管理</h2>
            <p style={{ fontSize: 14, color: theme.textSecondary }}>
              {isSuperAdmin ? '管理平台所有用户和管理员权限' : '管理平台用户'}
            </p>
          </div>
          {isAdmin && (
            <button onClick={() => setShowAddModal(true)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
              backgroundColor: theme.accent, color: '#fff', border: 'none', borderRadius: 8,
              cursor: 'pointer', fontSize: 14, fontWeight: 500,
            }}>
              <Plus size={18} />
              {isSuperAdmin ? '添加管理员/用户' : '添加用户'}
            </button>
          )}
        </div>

        {/* 权限说明卡片 - 仅超级管理员可见 */}
        {isSuperAdmin && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            marginBottom: 24,
          }}>
            <div style={{
              padding: 20,
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              borderRadius: 12,
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Shield size={20} color="#ef4444" />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#ef4444' }}>超级管理员</span>
              </div>
              <div style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>
                最高权限，可管理所有用户、管理员，拥有系统设置权限
              </div>
            </div>
            <div style={{
              padding: 20,
              backgroundColor: 'rgba(139, 92, 246, 0.08)',
              borderRadius: 12,
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Users size={20} color="#8b5cf6" />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#8b5cf6' }}>管理员</span>
              </div>
              <div style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>
                可上传、编辑、删除素材，审核内容，查看统计数据
              </div>
            </div>
            <div style={{
              padding: 20,
              backgroundColor: theme.bgTertiary,
              borderRadius: 12,
              border: `1px solid ${theme.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <User size={20} color={theme.textSecondary} />
                <span style={{ fontSize: 14, fontWeight: 600, color: theme.textSecondary }}>普通用户</span>
              </div>
              <div style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>
                可浏览、搜索、下载素材文件
              </div>
            </div>
          </div>
        )}

        {/* 统计卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: '总用户数', value: users.length, color: theme.accent },
            { label: '超级管理员', value: users.filter(u => u.role === 'superadmin').length, color: '#ef4444' },
            { label: '管理员', value: users.filter(u => u.role === 'admin').length, color: '#8b5cf6' },
            { label: '普通用户', value: users.filter(u => u.role === 'user').length, color: theme.textSecondary },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: 20, backgroundColor: theme.cardBg, borderRadius: 12, border: `1px solid ${theme.border}`,
            }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: stat.color, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: theme.textSecondary }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tab切换 */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[
            { id: 'all', name: '全部用户' },
            { id: 'admin', name: '管理员' },
            { id: 'user', name: '普通用户' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 500,
                color: activeTab === tab.id ? theme.accent : theme.textSecondary,
                backgroundColor: activeTab === tab.id ? theme.accentLight : theme.bgTertiary,
                border: activeTab === tab.id ? `1px solid ${theme.accent}` : `1px solid transparent`,
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* 用户列表 */}
        <div style={{
          backgroundColor: theme.cardBg,
          borderRadius: 14,
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: theme.bgTertiary }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: theme.textMuted }}>用户</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: theme.textMuted }}>角色</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: theme.textMuted }}>部门</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: theme.textMuted }}>上传数</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: theme.textMuted }}>创建者</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: theme.textMuted }}>状态</th>
                <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: theme.textMuted }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <tr key={user.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${['#6366f1', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#0891b2'][i % 7]}, ${['#8b5cf6', '#f43f5e', '#a78bfa', '#fbbf24', '#34d399', '#f87171', '#22d3ee'][i % 7]})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: 14, fontWeight: 600,
                      }}>{user.name[0]}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>{user.name}</div>
                        <div style={{ fontSize: 12, color: theme.textMuted }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      fontSize: 12, padding: '4px 10px', borderRadius: 4,
                      backgroundColor: getRoleColor(user.role).bg,
                      color: getRoleColor(user.role).color,
                      fontWeight: 500,
                    }}>{getRoleName(user.role)}</span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: theme.textSecondary }}>{user.department}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: theme.textSecondary }}>{user.uploads}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: theme.textSecondary }}>{user.createdBy}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 4,
                      backgroundColor: user.status === 'active' ? (darkMode ? 'rgba(74, 222, 128, 0.15)' : 'rgba(74, 222, 128, 0.1)') : theme.bgTertiary,
                      color: user.status === 'active' ? theme.success : theme.textMuted,
                    }}>
                      {user.status === 'active' ? '活跃' : '未活跃'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                      {/* 编辑按钮 - 超级管理员可以编辑所有人，管理员只能编辑普通用户 */}
                      {(isSuperAdmin || (isAdmin && user.role === 'user')) && user.role !== 'superadmin' && (
                        <button 
                          onClick={() => setEditUser(user)}
                          style={{ 
                            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            backgroundColor: theme.bgTertiary, border: 'none', borderRadius: 6, cursor: 'pointer', color: theme.textSecondary 
                          }}
                          title="编辑"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                      {/* 删除按钮 - 超级管理员可以删除管理员和用户，管理员只能删除普通用户 */}
                      {(isSuperAdmin && user.role !== 'superadmin') || (isAdmin && !isSuperAdmin && user.role === 'user') ? (
                        <button 
                          onClick={() => setShowDeleteConfirm(user)}
                          style={{ 
                            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            backgroundColor: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#ef4444' 
                          }}
                          title="删除"
                        >
                          <Trash2 size={16} />
                        </button>
                      ) : user.role === 'superadmin' ? (
                        <span style={{ fontSize: 11, color: theme.textMuted, padding: '8px 0' }}>最高权限</span>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddModal && <AddUserModal />}
        {showDeleteConfirm && <DeleteConfirmModal />}
      </div>
    );
  };

  // 审核管理
  const AdminAuditView = () => (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4 }}>审核管理</h2>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>审核待发布的素材内容</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: '待审核', value: 8, color: theme.warning },
          { label: '已通过', value: 156, color: theme.success },
          { label: '已驳回', value: 3, color: theme.textMuted },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: theme.cardBg,
            borderRadius: 12,
            padding: 20,
            border: `1px solid ${theme.border}`,
          }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: stat.color, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: theme.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: theme.cardBg,
        borderRadius: 14,
        border: `1px solid ${theme.border}`,
      }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>待审核列表</h3>
        </div>
        {assets.slice(0, 4).map((asset, i) => (
          <div key={asset.id} style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: i < 3 ? `1px solid ${theme.border}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 10,
                backgroundColor: theme.bgTertiary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}>{asset.thumbnail}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: theme.text, marginBottom: 4 }}>{asset.name}</div>
                <div style={{ fontSize: 12, color: theme.textMuted }}>
                  上传者: {asset.updatedBy} · {asset.format} · {asset.size}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                backgroundColor: theme.success,
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                color: '#fff',
                fontSize: 13,
              }}>
                <Check size={16} />
                通过
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: `1px solid #ef4444`,
                borderRadius: 6,
                cursor: 'pointer',
                color: '#ef4444',
                fontSize: 13,
              }}>
                <X size={16} />
                驳回
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 数据统计
  const AdminStatsView = () => (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4 }}>数据统计</h2>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>平台使用数据分析</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        {[
          { label: '总浏览量', value: '45,892', icon: Eye },
          { label: '总下载量', value: '12,456', icon: Download },
          { label: '活跃用户', value: '234', icon: Users },
          { label: '存储空间', value: '128 GB', icon: FolderOpen },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: theme.cardBg,
            borderRadius: 14,
            padding: 24,
            border: `1px solid ${theme.border}`,
          }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: theme.accentLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.accent,
              marginBottom: 16,
            }}>
              <stat.icon size={22} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: theme.text, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: theme.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: theme.cardBg,
        borderRadius: 14,
        border: `1px solid ${theme.border}`,
      }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>热门素材 TOP 5</h3>
        </div>
        {assets.sort((a, b) => b.downloads - a.downloads).slice(0, 5).map((asset, i) => (
          <div key={asset.id} style={{
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: i < 4 ? `1px solid ${theme.border}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                backgroundColor: i < 3 ? theme.accent : theme.bgTertiary,
                color: i < 3 ? '#fff' : theme.textMuted,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 600,
              }}>{i + 1}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: theme.bgTertiary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}>{asset.thumbnail}</div>
                <span style={{ fontSize: 14, color: theme.text, fontWeight: 500 }}>{asset.name}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: theme.textMuted, fontSize: 13 }}>
              <Download size={14} />
              {asset.downloads}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 系统设置
  const AdminSettingsView = () => (
    <div style={{ padding: 28, maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4 }}>系统设置</h2>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>管理平台基础配置</p>
      </div>

      <div style={{
        backgroundColor: theme.cardBg,
        borderRadius: 14,
        border: `1px solid ${theme.border}`,
        marginBottom: 24,
      }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>基本设置</h3>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>平台名称</label>
            <input
              type="text"
              defaultValue="Ankki Design"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${theme.border}`,
                borderRadius: 8,
                backgroundColor: theme.bg,
                color: theme.text,
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>公司名称</label>
            <input
              type="text"
              defaultValue="Ankki 科技有限公司"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${theme.border}`,
                borderRadius: 8,
                backgroundColor: theme.bg,
                color: theme.text,
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: theme.cardBg,
        borderRadius: 14,
        border: `1px solid ${theme.border}`,
      }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>上传设置</h3>
        </div>
        <div style={{ padding: 24 }}>
          {[
            { label: '需要审核', desc: '新上传的素材需要管理员审核后才能发布', active: true },
            { label: '自动版本号', desc: '上传新版本时自动递增版本号', active: true },
          ].map((setting, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i === 0 ? 20 : 0 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: theme.text, marginBottom: 4 }}>{setting.label}</div>
                <div style={{ fontSize: 12, color: theme.textMuted }}>{setting.desc}</div>
              </div>
              <div style={{
                width: 48,
                height: 26,
                borderRadius: 13,
                backgroundColor: setting.active ? theme.accent : theme.bgTertiary,
                padding: 3,
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  marginLeft: setting.active ? 22 : 0,
                  transition: 'margin-left 0.2s ease',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // PPT预览弹窗
  const PPTPreviewModal = () => {
    if (!previewPPT) return null;
    
    const isComplete = previewPPT.previewPages; // 判断是整套还是单页
    const totalPages = isComplete ? previewPPT.previewPages.length : 1;
    const currentPageData = isComplete ? previewPPT.previewPages[previewPage] : previewPPT.previewContent;
    
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
      }} onClick={() => { setPreviewPPT(null); setPreviewPage(0); }}>
        <div style={{
          width: '90%',
          maxWidth: 1100,
          maxHeight: '90vh',
          display: 'flex',
          gap: 24,
        }} onClick={e => e.stopPropagation()}>
          
          {/* 左侧 - PPT预览区 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* 预览主区域 */}
            <div style={{
              flex: 1,
              backgroundColor: currentPageData?.color || '#1e40af',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 48,
              position: 'relative',
              aspectRatio: '16/9',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            }}>
              {/* 关闭按钮 */}
              <button
                onClick={() => { setPreviewPPT(null); setPreviewPage(0); }}
                style={{
                  position: 'absolute',
                  top: -48,
                  right: 0,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                ✕
              </button>
              
              {/* PPT内容 */}
              <div style={{ textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 16, letterSpacing: 2 }}>
                  {isComplete ? currentPageData?.title : '昂楷科技'}
                </div>
                <div style={{ 
                  fontSize: isComplete ? 36 : 42, 
                  fontWeight: 600, 
                  marginBottom: 20,
                  lineHeight: 1.3,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {isComplete ? currentPageData?.content : currentPageData?.title}
                </div>
                {!isComplete && currentPageData?.subtitle && (
                  <div style={{ fontSize: 18, opacity: 0.8 }}>{currentPageData.subtitle}</div>
                )}
                {!isComplete && currentPageData?.content && (
                  <div style={{ fontSize: 16, opacity: 0.9, marginTop: 24, whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                    {currentPageData.content}
                  </div>
                )}
              </div>
              
              {/* 页码指示 */}
              {isComplete && (
                <div style={{
                  position: 'absolute',
                  bottom: 20,
                  right: 24,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  {previewPage + 1} / {totalPages}
                </div>
              )}
            </div>
            
            {/* 翻页控制 */}
            {isComplete && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 16,
                marginTop: 20,
              }}>
                <button
                  onClick={() => setPreviewPage(Math.max(0, previewPage - 1))}
                  disabled={previewPage === 0}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: previewPage === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                    color: previewPage === 0 ? 'rgba(255,255,255,0.3)' : '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: previewPage === 0 ? 'not-allowed' : 'pointer',
                    fontSize: 14,
                  }}
                >
                  ← 上一页
                </button>
                
                {/* 页码点 */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {previewPPT.previewPages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPreviewPage(i)}
                      style={{
                        width: previewPage === i ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: previewPage === i ? theme.accent : 'rgba(255,255,255,0.3)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => setPreviewPage(Math.min(totalPages - 1, previewPage + 1))}
                  disabled={previewPage === totalPages - 1}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: previewPage === totalPages - 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                    color: previewPage === totalPages - 1 ? 'rgba(255,255,255,0.3)' : '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: previewPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                    fontSize: 14,
                  }}
                >
                  下一页 →
                </button>
              </div>
            )}
          </div>
          
          {/* 右侧 - 信息面板 */}
          <div style={{
            width: 320,
            backgroundColor: theme.cardBg,
            borderRadius: 12,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              color: theme.text, 
              marginBottom: 8,
              lineHeight: 1.4,
            }}>
              {previewPPT.name}
            </h3>
            <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 20, lineHeight: 1.6 }}>
              {previewPPT.desc}
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: 8, 
              marginBottom: 20,
              flexWrap: 'wrap',
            }}>
              {previewPPT.tag && (
                <span style={{
                  padding: '4px 12px',
                  fontSize: 12,
                  backgroundColor: theme.accentLight,
                  color: theme.accent,
                  borderRadius: 4,
                }}>
                  {previewPPT.tag}
                </span>
              )}
              {previewPPT.pages && (
                <span style={{
                  padding: '4px 12px',
                  fontSize: 12,
                  backgroundColor: theme.bgTertiary,
                  color: theme.textSecondary,
                  borderRadius: 4,
                }}>
                  {previewPPT.pages}页
                </span>
              )}
              <span style={{
                padding: '4px 12px',
                fontSize: 12,
                backgroundColor: theme.bgTertiary,
                color: theme.textSecondary,
                borderRadius: 4,
              }}>
                {previewPPT.views}人阅读
              </span>
            </div>
            
            {/* 页面缩略图列表 - 仅整套显示 */}
            {isComplete && (
              <div style={{ flex: 1, overflowY: 'auto', marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 12 }}>
                  页面预览
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {previewPPT.previewPages.map((page, i) => (
                    <button
                      key={i}
                      onClick={() => setPreviewPage(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: 10,
                        backgroundColor: previewPage === i ? theme.accentLight : theme.bgTertiary,
                        border: previewPage === i ? `1px solid ${theme.accent}` : `1px solid transparent`,
                        borderRadius: 8,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{
                        width: 48,
                        height: 27,
                        backgroundColor: page.color,
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 8,
                        color: '#fff',
                        flexShrink: 0,
                      }}>
                        {i + 1}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ 
                          fontSize: 12, 
                          fontWeight: 500, 
                          color: previewPage === i ? theme.accent : theme.text,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {page.title}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button style={{
              width: '100%',
              padding: '14px',
              backgroundColor: theme.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}>
              <Download size={18} />
              下载模板
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 素材预览弹窗 - 支持所有文件类型
  const PreviewModal = () => {
    if (!previewAsset) return null;
    
    const [currentPage, setCurrentPage] = React.useState(0);
    
    // 判断文件类型
    const isExcel = previewAsset.excelData;
    const isPDF = previewAsset.pdfPreview;
    const isWord = previewAsset.wordPreview;
    const isPPT = previewAsset.pptPreview;
    const isZip = previewAsset.zipPreview;
    const isColorCard = previewAsset.imagePreview?.colors;
    const isSVG = previewAsset.svgPreview;
    const isImage = previewAsset.imagePreview && !previewAsset.imagePreview.colors;
    
    // 获取文件图标颜色
    const getFileColor = () => {
      switch(previewAsset.format) {
        case 'XLSX': return '#217346';
        case 'PDF': return '#DC2626';
        case 'DOCX': return '#2563EB';
        case 'PPTX': return '#D97706';
        case 'ZIP': return '#7C3AED';
        case 'PNG': case 'JPG': case 'SVG': return '#0891B2';
        default: return theme.accent;
      }
    };
    
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
      }} onClick={() => setPreviewAsset(null)}>
        <div style={{
          width: isExcel || isPDF || isWord || isPPT ? 1000 : isZip ? 700 : 800,
          maxHeight: '90vh',
          backgroundColor: theme.cardBg,
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }} onClick={e => e.stopPropagation()}>
          
          {/* 顶部标题栏 - 通用 */}
          <div style={{
            padding: '16px 24px',
            borderBottom: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.bgTertiary,
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: getFileColor(),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
              }}>
                {previewAsset.format}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>{previewAsset.name}</div>
                <div style={{ fontSize: 12, color: theme.textMuted }}>{previewAsset.format} · {previewAsset.size} · v{previewAsset.version}</div>
              </div>
            </div>
            <button
              onClick={() => setPreviewAsset(null)}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: theme.bgSecondary,
                border: `1px solid ${theme.border}`,
                cursor: 'pointer',
                color: theme.textSecondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              ✕
            </button>
          </div>
          
          {/* Excel 预览 */}
          {isExcel && (
            <>
              <div style={{ padding: '8px 24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: 16, backgroundColor: theme.bgSecondary, flexShrink: 0 }}>
                <div style={{ padding: '6px 12px', backgroundColor: '#217346', color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 500 }}>{previewAsset.excelData.sheetName}</div>
                <span style={{ fontSize: 12, color: theme.textMuted }}>{previewAsset.excelData.rows.length} 行 × {previewAsset.excelData.headers.length} 列</span>
              </div>
              <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '12px 16px', backgroundColor: '#217346', color: '#fff', fontWeight: 600, textAlign: 'center', border: '1px solid #1d6840', width: 50 }}>#</th>
                      {previewAsset.excelData.headers.map((header, i) => (
                        <th key={i} style={{ padding: '12px 16px', backgroundColor: '#217346', color: '#fff', fontWeight: 600, textAlign: 'left', border: '1px solid #1d6840', minWidth: 100 }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewAsset.excelData.rows.map((row, ri) => (
                      <tr key={ri} style={{ backgroundColor: ri % 2 === 0 ? theme.bgSecondary : theme.bgTertiary }}>
                        <td style={{ padding: '10px 16px', border: `1px solid ${theme.border}`, textAlign: 'center', color: theme.textMuted, backgroundColor: darkMode ? '#2d3748' : '#f0f4f8', fontWeight: 500 }}>{ri + 1}</td>
                        {row.map((cell, ci) => (
                          <td key={ci} style={{ padding: '10px 16px', border: `1px solid ${theme.border}`, color: theme.text }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          
          {/* PDF 预览 */}
          {isPDF && (
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <div style={{ width: 200, borderRight: `1px solid ${theme.border}`, overflowY: 'auto', padding: 16, backgroundColor: theme.bgTertiary }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 12 }}>共 {previewAsset.pdfPreview.totalPages} 页</div>
                {previewAsset.pdfPreview.pages.map((page, i) => (
                  <button key={i} onClick={() => setCurrentPage(i)} style={{ width: '100%', padding: 8, marginBottom: 8, backgroundColor: currentPage === i ? theme.accentLight : theme.bgSecondary, border: currentPage === i ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 4 }}>第 {page.num} 页</div>
                    <div style={{ fontSize: 12, color: currentPage === i ? theme.accent : theme.text, fontWeight: 500 }}>{page.title}</div>
                  </button>
                ))}
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: darkMode ? '#1a1a1a' : '#f0f0f0' }}>
                <div style={{ width: '100%', maxWidth: 500, aspectRatio: '1/1.414', backgroundColor: '#fff', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, color: '#1a1a1a' }}>
                  <div style={{ fontSize: 12, color: '#DC2626', marginBottom: 16, fontWeight: 600 }}>{previewAsset.pdfPreview.pages[currentPage]?.title}</div>
                  <div style={{ fontSize: 18, fontWeight: 500, textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.8 }}>{previewAsset.pdfPreview.pages[currentPage]?.content}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Word 预览 */}
          {isWord && (
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <div style={{ width: 220, borderRight: `1px solid ${theme.border}`, overflowY: 'auto', padding: 16, backgroundColor: theme.bgTertiary }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 12 }}>目录 · 共 {previewAsset.wordPreview.totalPages} 页</div>
                {previewAsset.wordPreview.sections.map((section, i) => (
                  <button key={i} onClick={() => setCurrentPage(i)} style={{ width: '100%', padding: 10, marginBottom: 6, backgroundColor: currentPage === i ? theme.accentLight : 'transparent', border: 'none', borderLeft: currentPage === i ? `3px solid ${theme.accent}` : `3px solid transparent`, borderRadius: 0, cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ fontSize: 13, color: currentPage === i ? theme.accent : theme.text, fontWeight: 500 }}>{section.title}</div>
                  </button>
                ))}
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 40, backgroundColor: darkMode ? '#1a1a1a' : '#f5f5f5' }}>
                <div style={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#fff', borderRadius: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.1)', padding: 48, minHeight: 500, color: '#1a1a1a' }}>
                  <h2 style={{ fontSize: 20, fontWeight: 600, color: '#2563EB', marginBottom: 24, borderBottom: '2px solid #2563EB', paddingBottom: 12 }}>{previewAsset.wordPreview.sections[currentPage]?.title}</h2>
                  <div style={{ fontSize: 14, lineHeight: 2, whiteSpace: 'pre-line', color: '#333' }}>{previewAsset.wordPreview.sections[currentPage]?.content}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* PPT 预览 */}
          {isPPT && (
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <div style={{ width: 180, borderRight: `1px solid ${theme.border}`, overflowY: 'auto', padding: 12, backgroundColor: theme.bgTertiary }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, marginBottom: 12, padding: '0 4px' }}>共 {previewAsset.pptPreview.totalSlides} 页</div>
                {previewAsset.pptPreview.slides.map((slide, i) => (
                  <button key={i} onClick={() => setCurrentPage(i)} style={{ width: '100%', aspectRatio: '16/9', marginBottom: 8, backgroundColor: slide.color, border: currentPage === i ? `3px solid ${theme.accent}` : `2px solid transparent`, borderRadius: 6, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 8, position: 'relative' }}>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)' }}>{slide.title}</span>
                    <span style={{ position: 'absolute', bottom: 4, right: 6, fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>{i + 1}</span>
                  </button>
                ))}
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: darkMode ? '#0a0a0a' : '#1a1a1a' }}>
                <div style={{ width: '100%', maxWidth: 640, aspectRatio: '16/9', backgroundColor: previewAsset.pptPreview.slides[currentPage]?.color, borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>{previewAsset.pptPreview.slides[currentPage]?.title}</div>
                  <div style={{ fontSize: 28, fontWeight: 600, color: '#fff', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{previewAsset.pptPreview.slides[currentPage]?.content}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* ZIP 预览 */}
          {isZip && (
            <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
              <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 16 }}>压缩包包含 {previewAsset.zipPreview.totalFiles} 个文件</div>
              <div style={{ border: `1px solid ${theme.border}`, borderRadius: 8, overflow: 'hidden' }}>
                {previewAsset.zipPreview.files.map((file, i) => (
                  <div key={i} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: i % 2 === 0 ? theme.bgSecondary : theme.bgTertiary, borderBottom: i < previewAsset.zipPreview.files.length - 1 ? `1px solid ${theme.border}` : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 20 }}>{file.type === 'image' ? '🖼️' : file.type === 'text' ? '📄' : '📁'}</span>
                      <span style={{ fontSize: 13, color: theme.text }}>{file.name}</span>
                    </div>
                    <span style={{ fontSize: 12, color: theme.textMuted }}>{file.size}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: theme.textMuted, textAlign: 'center' }}>... 还有 {previewAsset.zipPreview.totalFiles - previewAsset.zipPreview.files.length} 个文件</div>
            </div>
          )}
          
          {/* 色卡预览 */}
          {isColorCard && (
            <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
              <div style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 24 }}>品牌标准色彩规范</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
                {previewAsset.imagePreview.colors.map((color, i) => (
                  <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                    <div style={{ height: 100, backgroundColor: color.hex }} />
                    <div style={{ padding: 12, backgroundColor: theme.bgTertiary }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 4 }}>{color.name}</div>
                      <div style={{ fontSize: 11, color: theme.textMuted }}>{color.hex}</div>
                      <div style={{ fontSize: 11, color: theme.textMuted }}>RGB: {color.rgb}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* SVG Logo 预览 */}
          {isSVG && (
            <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
              <div style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 24 }}>Logo 变体预览</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {previewAsset.svgPreview.variants.map((variant, i) => (
                  <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                    <div style={{ height: 160, backgroundColor: variant.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 80, height: 80, borderRadius: 16, backgroundColor: variant.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: variant.bg, fontSize: 32, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>A</div>
                    </div>
                    <div style={{ padding: 12, backgroundColor: theme.bgTertiary, textAlign: 'center' }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: theme.text }}>{variant.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 普通图片预览 */}
          {isImage && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: darkMode ? '#0a0a0a' : '#f0f0f0' }}>
              <div style={{ width: '100%', maxWidth: 600, aspectRatio: '16/9', backgroundColor: theme.bgTertiary, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: `1px solid ${theme.border}` }}>
                <span style={{ fontSize: 80 }}>{previewAsset.thumbnail}</span>
              </div>
              <div style={{ fontSize: 13, color: theme.textMuted }}>{previewAsset.imagePreview.dimensions} · {previewAsset.imagePreview.colorMode}</div>
              <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 8, textAlign: 'center', maxWidth: 400 }}>{previewAsset.imagePreview.description}</div>
            </div>
          )}
          
          {/* 底部操作栏 */}
          <div style={{ padding: '16px 24px', borderTop: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.bgTertiary, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: theme.textMuted }}>
              <span>上传者: {previewAsset.updatedBy}</span>
              <span>更新: {previewAsset.updatedAt}</span>
              <span>下载: {previewAsset.downloads}次</span>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', backgroundColor: getFileColor(), color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
              <Download size={18} />
              下载文件
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 渲染视图
  // 功能反馈提交页面
  const FeedbackView = () => {
    const [feedbackType, setFeedbackType] = useState('feature');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackContent, setFeedbackContent] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const feedbackTypes = [
      { id: 'feature', name: '功能建议', icon: Lightbulb, color: '#f59e0b', desc: '对产品功能的改进建议' },
      { id: 'bug', name: 'Bug反馈', icon: Bug, color: '#ef4444', desc: '报告使用中遇到的问题' },
      { id: 'experience', name: '体验优化', icon: ThumbsUp, color: '#10b981', desc: '关于用户体验的建议' },
      { id: 'other', name: '其他反馈', icon: MessageSquare, color: '#8b5cf6', desc: '其他类型的反馈意见' },
    ];

    // 我的反馈历史
    const myFeedbacks = [
      { id: 1, type: 'feature', title: '希望增加批量下载功能', status: 'processing', createdAt: '2024-01-14', reply: null },
      { id: 2, type: 'bug', title: 'PPT预览时偶尔加载失败', status: 'resolved', createdAt: '2024-01-10', reply: '感谢反馈，问题已修复，请刷新页面重试。' },
      { id: 3, type: 'experience', title: '建议优化搜索结果排序', status: 'pending', createdAt: '2024-01-08', reply: null },
    ];

    const getStatusInfo = (status) => {
      switch(status) {
        case 'pending': return { name: '待处理', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
        case 'processing': return { name: '处理中', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' };
        case 'resolved': return { name: '已解决', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' };
        case 'rejected': return { name: '已关闭', color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' };
        default: return { name: '未知', color: theme.textMuted, bg: theme.bgTertiary };
      }
    };

    const handleSubmit = () => {
      if (feedbackTitle && feedbackContent) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFeedbackTitle('');
          setFeedbackContent('');
        }, 3000);
      }
    };

    return (
      <div style={{ padding: 28 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 8 }}>功能反馈</h2>
          <p style={{ fontSize: 14, color: theme.textSecondary }}>您的反馈对我们非常重要，帮助我们不断改进产品</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* 提交反馈 */}
          <div style={{
            backgroundColor: theme.cardBg,
            borderRadius: 14,
            border: `1px solid ${theme.border}`,
            overflow: 'hidden',
          }}>
            <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>提交反馈</h3>
            </div>
            <div style={{ padding: 24 }}>
              {/* 反馈类型 */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 12 }}>反馈类型</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {feedbackTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setFeedbackType(type.id)}
                      style={{
                        padding: 14,
                        backgroundColor: feedbackType === type.id ? `${type.color}15` : theme.bgTertiary,
                        border: feedbackType === type.id ? `2px solid ${type.color}` : `1px solid ${theme.border}`,
                        borderRadius: 10,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <type.icon size={18} color={feedbackType === type.id ? type.color : theme.textSecondary} />
                        <span style={{ fontSize: 14, fontWeight: 500, color: feedbackType === type.id ? type.color : theme.text }}>{type.name}</span>
                      </div>
                      <div style={{ fontSize: 11, color: theme.textMuted }}>{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 反馈标题 */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>标题 *</label>
                <input
                  type="text"
                  placeholder="简要描述您的反馈"
                  value={feedbackTitle}
                  onChange={(e) => setFeedbackTitle(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                    borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* 反馈内容 */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>详细描述 *</label>
                <textarea
                  placeholder="请详细描述您的建议或遇到的问题..."
                  rows={5}
                  value={feedbackContent}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                    borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none',
                    resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6,
                  }}
                />
              </div>

              {/* 提交按钮 */}
              {submitted ? (
                <div style={{
                  padding: 16,
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', backgroundColor: '#10b981',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Check size={20} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#10b981' }}>提交成功！</div>
                    <div style={{ fontSize: 12, color: theme.textSecondary }}>感谢您的反馈，我们会尽快处理</div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!feedbackTitle || !feedbackContent}
                  style={{
                    width: '100%', padding: 14, backgroundColor: feedbackTitle && feedbackContent ? theme.accent : theme.bgTertiary,
                    color: feedbackTitle && feedbackContent ? '#fff' : theme.textMuted,
                    border: 'none', borderRadius: 8, cursor: feedbackTitle && feedbackContent ? 'pointer' : 'not-allowed',
                    fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  <Send size={18} />
                  提交反馈
                </button>
              )}
            </div>
          </div>

          {/* 我的反馈历史 */}
          <div style={{
            backgroundColor: theme.cardBg,
            borderRadius: 14,
            border: `1px solid ${theme.border}`,
            overflow: 'hidden',
          }}>
            <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>我的反馈</h3>
            </div>
            <div style={{ maxHeight: 500, overflowY: 'auto' }}>
              {myFeedbacks.length > 0 ? myFeedbacks.map((feedback, i) => {
                const statusInfo = getStatusInfo(feedback.status);
                const typeInfo = feedbackTypes.find(t => t.id === feedback.type);
                return (
                  <div key={feedback.id} style={{
                    padding: '16px 24px',
                    borderBottom: i < myFeedbacks.length - 1 ? `1px solid ${theme.border}` : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {typeInfo && <typeInfo.icon size={16} color={typeInfo.color} />}
                        <span style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>{feedback.title}</span>
                      </div>
                      <span style={{
                        fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 4,
                        backgroundColor: statusInfo.bg, color: statusInfo.color,
                      }}>{statusInfo.name}</span>
                    </div>
                    <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: feedback.reply ? 10 : 0 }}>
                      提交于 {feedback.createdAt}
                    </div>
                    {feedback.reply && (
                      <div style={{
                        marginTop: 10,
                        padding: 12,
                        backgroundColor: theme.bgTertiary,
                        borderRadius: 8,
                        borderLeft: `3px solid ${theme.accent}`,
                      }}>
                        <div style={{ fontSize: 11, color: theme.accent, fontWeight: 500, marginBottom: 4 }}>官方回复</div>
                        <div style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.5 }}>{feedback.reply}</div>
                      </div>
                    )}
                  </div>
                );
              }) : (
                <div style={{ padding: 40, textAlign: 'center' }}>
                  <MessageSquare size={40} color={theme.textMuted} style={{ marginBottom: 12, opacity: 0.5 }} />
                  <div style={{ fontSize: 14, color: theme.textMuted }}>暂无反馈记录</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 管理后台 - 反馈管理页面
  const AdminFeedbackView = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [replyText, setReplyText] = useState('');

    const allFeedbacks = [
      { id: 1, type: 'feature', title: '希望增加批量下载功能', content: '目前只能单个下载素材，如果能支持批量选择下载会更方便。', user: '张设计', email: 'zhang@ankki.com', status: 'processing', createdAt: '2024-01-14 14:30', reply: null },
      { id: 2, type: 'bug', title: 'PPT预览时偶尔加载失败', content: '在Chrome浏览器上预览PPT文件时，有时会显示加载失败，刷新后正常。', user: '李经理', email: 'li@ankki.com', status: 'resolved', createdAt: '2024-01-10 09:15', reply: '感谢反馈，问题已修复，请刷新页面重试。' },
      { id: 3, type: 'experience', title: '建议优化搜索结果排序', content: '搜索结果希望能按相关度、时间、下载量等多种方式排序。', user: '王策划', email: 'wang@ankki.com', status: 'pending', createdAt: '2024-01-08 16:45', reply: null },
      { id: 4, type: 'feature', title: '希望支持素材收藏功能', content: '能够收藏常用的素材，方便下次快速找到。', user: '陈运营', email: 'chen@ankki.com', status: 'pending', createdAt: '2024-01-07 11:20', reply: null },
      { id: 5, type: 'other', title: '关于素材使用授权的疑问', content: '请问下载的素材可以用于商业项目吗？有没有使用范围的限制？', user: '赵市场', email: 'zhao@ankki.com', status: 'resolved', createdAt: '2024-01-05 10:00', reply: '您好，平台素材仅限公司内部使用，详细授权说明请查看使用规范文档。' },
    ];

    const feedbackTypes = [
      { id: 'feature', name: '功能建议', icon: Lightbulb, color: '#f59e0b' },
      { id: 'bug', name: 'Bug反馈', icon: Bug, color: '#ef4444' },
      { id: 'experience', name: '体验优化', icon: ThumbsUp, color: '#10b981' },
      { id: 'other', name: '其他反馈', icon: MessageSquare, color: '#8b5cf6' },
    ];

    const getStatusInfo = (status) => {
      switch(status) {
        case 'pending': return { name: '待处理', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
        case 'processing': return { name: '处理中', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' };
        case 'resolved': return { name: '已解决', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' };
        case 'rejected': return { name: '已关闭', color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' };
        default: return { name: '未知', color: theme.textMuted, bg: theme.bgTertiary };
      }
    };

    const filteredFeedbacks = activeTab === 'all' ? allFeedbacks :
      allFeedbacks.filter(f => f.status === activeTab);

    const stats = [
      { label: '全部反馈', value: allFeedbacks.length, color: theme.accent },
      { label: '待处理', value: allFeedbacks.filter(f => f.status === 'pending').length, color: '#f59e0b' },
      { label: '处理中', value: allFeedbacks.filter(f => f.status === 'processing').length, color: '#3b82f6' },
      { label: '已解决', value: allFeedbacks.filter(f => f.status === 'resolved').length, color: '#10b981' },
    ];

    // 反馈详情弹窗
    const FeedbackDetailModal = () => {
      if (!selectedFeedback) return null;
      const statusInfo = getStatusInfo(selectedFeedback.status);
      const typeInfo = feedbackTypes.find(t => t.id === selectedFeedback.type);

      return (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }} onClick={() => setSelectedFeedback(null)}>
          <div style={{
            width: 560, maxHeight: '90vh', backgroundColor: theme.cardBg, borderRadius: 16, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              padding: '20px 24px', borderBottom: `1px solid ${theme.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {typeInfo && (
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, backgroundColor: `${typeInfo.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <typeInfo.icon size={20} color={typeInfo.color} />
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>{selectedFeedback.title}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>{typeInfo?.name}</div>
                </div>
              </div>
              <button onClick={() => setSelectedFeedback(null)} style={{
                width: 32, height: 32, borderRadius: '50%', backgroundColor: theme.bgTertiary,
                border: 'none', cursor: 'pointer', color: theme.textSecondary, fontSize: 16,
              }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              {/* 反馈信息 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 14, fontWeight: 600,
                }}>{selectedFeedback.user[0]}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>{selectedFeedback.user}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>{selectedFeedback.email}</div>
                </div>
                <span style={{
                  marginLeft: 'auto', fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 4,
                  backgroundColor: statusInfo.bg, color: statusInfo.color,
                }}>{statusInfo.name}</span>
              </div>

              {/* 反馈内容 */}
              <div style={{
                padding: 16, backgroundColor: theme.bgTertiary, borderRadius: 10, marginBottom: 20,
              }}>
                <div style={{ fontSize: 14, color: theme.text, lineHeight: 1.8 }}>{selectedFeedback.content}</div>
                <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 12 }}>提交于 {selectedFeedback.createdAt}</div>
              </div>

              {/* 已有回复 */}
              {selectedFeedback.reply && (
                <div style={{
                  padding: 16, backgroundColor: 'rgba(217, 119, 87, 0.08)', borderRadius: 10,
                  borderLeft: `3px solid ${theme.accent}`, marginBottom: 20,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: theme.accent, marginBottom: 8 }}>官方回复</div>
                  <div style={{ fontSize: 14, color: theme.text, lineHeight: 1.6 }}>{selectedFeedback.reply}</div>
                </div>
              )}

              {/* 回复输入框 */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>
                  {selectedFeedback.reply ? '追加回复' : '回复用户'}
                </label>
                <textarea
                  placeholder="输入回复内容..."
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                    borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14,
                    outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6,
                  }}
                />
              </div>
            </div>

            {/* 底部操作 */}
            <div style={{
              padding: '16px 24px', borderTop: `1px solid ${theme.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  padding: '8px 16px', fontSize: 13, backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  color: '#f59e0b', border: 'none', borderRadius: 6, cursor: 'pointer',
                }}>标记处理中</button>
                <button style={{
                  padding: '8px 16px', fontSize: 13, backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981', border: 'none', borderRadius: 6, cursor: 'pointer',
                }}>标记已解决</button>
              </div>
              <button style={{
                padding: '10px 20px', fontSize: 14, fontWeight: 500,
                backgroundColor: replyText ? theme.accent : theme.bgTertiary,
                color: replyText ? '#fff' : theme.textMuted,
                border: 'none', borderRadius: 8, cursor: replyText ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <Send size={16} />
                发送回复
              </button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div style={{ padding: 28 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4 }}>反馈管理</h2>
          <p style={{ fontSize: 14, color: theme.textSecondary }}>查看和处理用户提交的反馈</p>
        </div>

        {/* 统计卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              padding: 20, backgroundColor: theme.cardBg, borderRadius: 12, border: `1px solid ${theme.border}`,
            }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: stat.color, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: theme.textSecondary }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tab切换 */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[
            { id: 'all', name: '全部' },
            { id: 'pending', name: '待处理' },
            { id: 'processing', name: '处理中' },
            { id: 'resolved', name: '已解决' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px', fontSize: 13, fontWeight: 500,
                color: activeTab === tab.id ? theme.accent : theme.textSecondary,
                backgroundColor: activeTab === tab.id ? theme.accentLight : theme.bgTertiary,
                border: activeTab === tab.id ? `1px solid ${theme.accent}` : `1px solid transparent`,
                borderRadius: 6, cursor: 'pointer',
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* 反馈列表 */}
        <div style={{
          backgroundColor: theme.cardBg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: theme.bgTertiary }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: theme.textMuted }}>反馈内容</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: theme.textMuted, width: 100 }}>类型</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: theme.textMuted, width: 120 }}>提交人</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: theme.textMuted, width: 140 }}>时间</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: theme.textMuted, width: 90 }}>状态</th>
                <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: theme.textMuted, width: 80 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((feedback, i) => {
                const statusInfo = getStatusInfo(feedback.status);
                const typeInfo = feedbackTypes.find(t => t.id === feedback.type);
                return (
                  <tr key={feedback.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: theme.text, marginBottom: 4 }}>{feedback.title}</div>
                      <div style={{ fontSize: 12, color: theme.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300 }}>{feedback.content}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {typeInfo && <typeInfo.icon size={14} color={typeInfo.color} />}
                        <span style={{ fontSize: 12, color: typeInfo?.color }}>{typeInfo?.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: theme.textSecondary }}>{feedback.user}</td>
                    <td style={{ padding: '14px 20px', fontSize: 12, color: theme.textMuted }}>{feedback.createdAt}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 4,
                        backgroundColor: statusInfo.bg, color: statusInfo.color,
                      }}>{statusInfo.name}</span>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                      <button
                        onClick={() => setSelectedFeedback(feedback)}
                        style={{
                          padding: '6px 12px', fontSize: 12, backgroundColor: theme.accentLight,
                          color: theme.accent, border: 'none', borderRadius: 6, cursor: 'pointer',
                        }}
                      >查看</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {selectedFeedback && <FeedbackDetailModal />}
      </div>
    );
  };

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <DashboardView />;
      case 'assets': return <AssetsView />;
      case 'upload': return <UploadView />;
      case 'ppt-templates': return <PPTTemplatesView />;
      case 'feedback': return <FeedbackView />;
      case 'admin-users': return <AdminUsersView />;
      case 'admin-audit': return <AdminAuditView />;
      case 'admin-feedback': return <AdminFeedbackView />;
      case 'admin-stats': return <AdminStatsView />;
      case 'admin-settings': return <AdminSettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: theme.text,
      display: 'flex',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: ${theme.textMuted}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 3px; }
        button:hover { opacity: 0.9; }
      `}</style>
      
      <Sidebar />
      
      <main style={{ marginLeft: 260, flex: 1, minHeight: '100vh' }}>
        <TopBar />
        {renderView()}
      </main>

      <PreviewModal />
      <PPTPreviewModal />
    </div>
  );
}
