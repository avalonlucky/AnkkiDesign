import React, { useState } from 'react';
import { Upload, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function UploadModal() {
  const { theme, darkMode, currentUser, isSuperAdmin, isAdmin, setUploadOpen, addAuditItem, addBrochure } = useApp();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [assetName, setAssetName] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [version, setVersion] = useState('1.0');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = React.useRef(null);

  const onClose = () => setUploadOpen(false);

  const categoryTree = {
    'brochure': { name: '产品彩页', icon: '📖', subs: [
      { id: 'company-intro', name: '公司介绍' }, { id: 'product-single', name: '产品单页' }, { id: 'solution', name: '解决方案' }, { id: 'case-study', name: '案例集' },
    ]},
    'brand': { name: '品牌素材', icon: '🎨', subs: [
      { id: 'logo', name: 'Logo标志' }, { id: 'color', name: '色卡规范' }, { id: 'font', name: '字体文件' }, { id: 'vi', name: 'VI规范' },
    ]},
    'template': { name: '模板文件', icon: '📄', subs: [
      { id: 'ppt', name: 'PPT模板' }, { id: 'word', name: 'Word模板' }, { id: 'excel', name: 'Excel模板' }, { id: 'contract', name: '合同模板' },
    ]},
    'ppt-complete': { name: 'PPT定制模板（整套）', icon: '📊', subs: [
      { id: 'report', name: '汇报' }, { id: 'solution', name: '解决方案' }, { id: 'product', name: '产品' }, { id: 'annual', name: '年会' }, { id: 'company', name: '企业介绍' },
    ]},
    'ppt-single': { name: 'PPT创意版式（单页）', icon: '📑', subs: [
      { id: 'cover', name: '封面' }, { id: 'catalog', name: '目录' }, { id: 'transition', name: '过渡页' }, { id: 'ending', name: '结尾页' },
      { id: 'content-1', name: '一段内容' }, { id: 'content-2', name: '两段内容' }, { id: 'content-multi', name: '多段内容' },
      { id: 'image-product', name: '产品展示' }, { id: 'image-multi', name: '多图排版' }, { id: 'timeline', name: '时间轴' },
      { id: 'structure', name: '架构图' }, { id: 'chart', name: '数据图表' }, { id: 'table', name: '表格' },
    ]},
    'marketing': { name: '营销素材', icon: '📢', subs: [
      { id: 'poster', name: '海报' }, { id: 'banner', name: '横幅广告' }, { id: 'social', name: '社交媒体' }, { id: 'video', name: '视频素材' },
    ]},
    'guide': { name: '规范指南', icon: '📘', subs: [
      { id: 'brand-guide', name: '品牌手册' }, { id: 'design-guide', name: '设计规范' }, { id: 'tech-doc', name: '技术文档' }, { id: 'user-manual', name: '用户手册' },
    ]},
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const fileInfos = files.map(file => ({ file, name: file.name, size: formatFileSize(file.size), type: file.type, extension: file.name.split('.').pop().toUpperCase() }));
    setSelectedFiles([...selectedFiles, ...fileInfos]);
    if (!assetName && files.length > 0) setAssetName(files[0].name.replace(/\.[^/.]+$/, ''));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const fileInfos = files.map(file => ({ file, name: file.name, size: formatFileSize(file.size), type: file.type, extension: file.name.split('.').pop().toUpperCase() }));
    setSelectedFiles([...selectedFiles, ...fileInfos]);
    if (!assetName && files.length > 0) setAssetName(files[0].name.replace(/\.[^/.]+$/, ''));
  };

  const removeFile = (index) => setSelectedFiles(selectedFiles.filter((_, i) => i !== index));

  const getFileIcon = (extension) => {
    const icons = { 'PDF': '📕', 'DOCX': '📘', 'DOC': '📘', 'XLSX': '📗', 'XLS': '📗', 'PPTX': '📙', 'PPT': '📙', 'PNG': '🖼️', 'JPG': '🖼️', 'JPEG': '🖼️', 'SVG': '🎨', 'ZIP': '📦', 'RAR': '📦' };
    return icons[extension] || '📄';
  };

  const handleSubmit = async () => {
    if (selectedFiles.length > 0 && assetName && mainCategory && subCategory) {
      setUploading(true);
      setTimeout(async () => {
        setUploading(false);
        setUploadSuccess(true);
        if (isAdmin && mainCategory === 'brochure') {
          // 管理员上传彩页 → 写入 Supabase brochures 表 + Storage
          const subLabels = { 'company-intro': '公司介绍', 'product-single': '产品单页', 'solution': '解决方案', 'case-study': '案例集' };
          const gradients = [['#1478F0','#0a4fa8'],['#7c3aed','#4c1d95'],['#0f766e','#134e4a'],['#be123c','#881337'],['#b45309','#78350f'],['#0369a1','#0c4a6e']];
          const g = gradients[Math.floor(Math.random() * gradients.length)];
          await addBrochure({
            file: selectedFiles[0]?.file || null,
            meta: {
              title: assetName,
              category: subLabels[subCategory] || subCategory,
              gradient: g,
              uploadedBy: currentUser.name,
              size: selectedFiles[0]?.size || '-',
              description: description || assetName,
            },
          });
        } else if (!isAdmin) {
          // 普通用户上传 → 写入 Supabase audit_items 表
          await addAuditItem({
            id: `upload-${Date.now()}`,
            name: assetName,
            format: selectedFiles[0]?.extension || '未知',
            size: selectedFiles[0]?.size || '-',
            version,
            category: mainCategory,
            subCategory,
            updatedBy: currentUser.name,
            updatedAt: new Date().toLocaleDateString('zh-CN'),
            auditStatus: 'pending',
          });
        }
        setTimeout(() => {
          setUploadSuccess(false);
          setSelectedFiles([]); setAssetName(''); setMainCategory(''); setSubCategory(''); setVersion('1.0'); setDescription('');
        }, 3000);
      }, 2000);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div className="modal-content" style={{ width: 760, maxHeight: '90vh', backgroundColor: theme.cardBg, borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '20px 28px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: theme.text, marginBottom: 4 }}>上传素材</h2>
            <p style={{ fontSize: 13, color: theme.textSecondary }}>{isAdmin ? '管理员上传后直接发布，无需审核' : '上传后需经管理员审核方可发布'}</p>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: theme.bgTertiary, border: 'none', cursor: 'pointer', color: theme.textSecondary, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, backgroundColor: theme.bgTertiary, borderRadius: 5, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: isSuperAdmin ? 'linear-gradient(135deg, #ef4444, #f97316)' : 'linear-gradient(135deg, #8b5cf6, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 600 }}>{currentUser.name[0]}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>上传者：{currentUser.name}</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>{currentUser.email} · {isSuperAdmin ? '超级管理员' : '管理员'}</div>
            </div>
          </div>

          <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} style={{ border: `2px dashed ${selectedFiles.length > 0 ? theme.accent : theme.border}`, borderRadius: 8, padding: selectedFiles.length > 0 ? 24 : 48, textAlign: 'center', marginBottom: 24, backgroundColor: selectedFiles.length > 0 ? theme.accentLight : theme.cardBg, transition: 'all 0.2s ease' }}>
            <input ref={fileInputRef} type="file" multiple accept=".docx,.doc,.xlsx,.xls,.pptx,.ppt,.pdf,.png,.jpg,.jpeg,.svg,.zip,.rar" onChange={handleFileSelect} style={{ display: 'none' }} />
            {selectedFiles.length === 0 ? (
              <>
                <div style={{ width: 72, height: 72, borderRadius: 8, backgroundColor: theme.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: theme.accent }}><Upload size={32} /></div>
                <div style={{ fontSize: 16, fontWeight: 500, color: theme.text, marginBottom: 8 }}>拖拽文件到此处上传</div>
                <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 20 }}>支持 DOCX、XLSX、PPTX、JPG、PNG、PDF、SVG、ZIP 等格式</div>
                <button onClick={() => fileInputRef.current?.click()} style={{ padding: '12px 28px', backgroundColor: theme.accent, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>选择文件</button>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 16 }}>
                  {selectedFiles.map((file, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: theme.cardBg, borderRadius: 5, marginBottom: 8, border: `1px solid ${theme.border}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 28 }}>{getFileIcon(file.extension)}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>{file.name}</div>
                          <div style={{ fontSize: 12, color: theme.textMuted }}>{file.extension} · {file.size}</div>
                        </div>
                      </div>
                      <button onClick={() => removeFile(index)} style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'rgba(239,68,68,0.1)', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>
                    </div>
                  ))}
                </div>
                <button onClick={() => fileInputRef.current?.click()} style={{ padding: '10px 20px', backgroundColor: 'transparent', color: theme.accent, border: `1px solid ${theme.accent}`, borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>+ 继续添加文件</button>
              </>
            )}
          </div>

          <div style={{ backgroundColor: theme.bgTertiary, borderRadius: 6, padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text, marginBottom: 24 }}>素材信息</h3>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>素材名称 *</label>
              <input type="text" placeholder="输入素材名称" value={assetName} onChange={(e) => setAssetName(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`, borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>一级分类 *</label>
                <select value={mainCategory} onChange={(e) => { setMainCategory(e.target.value); setSubCategory(''); }} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`, borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none' }}>
                  <option value="">选择一级分类</option>
                  {Object.entries(categoryTree).map(([key, cat]) => (<option key={key} value={key}>{cat.icon} {cat.name}</option>))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>二级分类 *</label>
                <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} disabled={!mainCategory} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`, borderRadius: 8, backgroundColor: mainCategory ? theme.bg : theme.bgTertiary, color: mainCategory ? theme.text : theme.textMuted, fontSize: 14, outline: 'none' }}>
                  <option value="">{mainCategory ? '选择二级分类' : '请先选择一级分类'}</option>
                  {mainCategory && categoryTree[mainCategory]?.subs.map(sub => (<option key={sub.id} value={sub.id}>{sub.name}</option>))}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>版本号 *</label>
              <input type="text" placeholder="例如: 1.0" value={version} onChange={(e) => setVersion(e.target.value)} style={{ width: 200, padding: '12px 16px', border: `1px solid ${theme.border}`, borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>使用规范说明</label>
              <textarea placeholder="描述该素材的使用场景和规范要求..." rows={4} value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`, borderRadius: 8, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }} />
            </div>
            {uploadSuccess && (
              <div style={{ padding: 16, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 5, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={22} color="#fff" /></div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: '#10b981' }}>{isAdmin ? '发布成功！' : '上传成功！'}</div>
                  <div style={{ fontSize: 13, color: theme.textSecondary }}>{isAdmin ? '素材已直接发布，现已在素材库中可见。' : '素材已提交审核，审核通过后将显示在素材库中。'}</div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleSubmit} disabled={uploading || selectedFiles.length === 0 || !assetName || !mainCategory || !subCategory} style={{ flex: 1, padding: '14px', backgroundColor: (selectedFiles.length > 0 && assetName && mainCategory && subCategory) ? theme.accent : theme.bgTertiary, color: (selectedFiles.length > 0 && assetName && mainCategory && subCategory) ? '#fff' : theme.textMuted, border: 'none', borderRadius: 8, cursor: (selectedFiles.length > 0 && assetName && mainCategory && subCategory) ? 'pointer' : 'not-allowed', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {uploading ? (<><span style={{ width: 18, height: 18, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />上传中...</>) : isAdmin ? '直接发布' : '提交审核'}
              </button>
              <button onClick={onClose} style={{ padding: '14px 28px', backgroundColor: 'transparent', color: theme.textSecondary, border: `1px solid ${theme.border}`, borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
