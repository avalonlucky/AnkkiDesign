import React, { useState } from 'react';
import { Shield, Users, User, Plus, Edit, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminUsers() {
  const { theme, darkMode, isAdmin, isSuperAdmin } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

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
    switch (role) {
      case 'superadmin': return '超级管理员';
      case 'admin': return '管理员';
      case 'user': return '普通用户';
      default: return '未知';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'superadmin': return { bg: darkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      case 'admin': return { bg: darkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' };
      default: return { bg: theme.bgTertiary, color: theme.textSecondary };
    }
  };

  const filteredUsers = activeTab === 'all' ? users :
    activeTab === 'admin' ? users.filter(u => u.role === 'admin' || u.role === 'superadmin') :
    users.filter(u => u.role === 'user');

  const AddUserModal = () => (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }} onClick={() => setShowAddModal(false)}>
      <div style={{
        width: 480, backgroundColor: theme.cardBg, borderRadius: 8, overflow: 'hidden',
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          padding: '20px 24px', borderBottom: `1px solid ${theme.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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
              padding: 16, backgroundColor: theme.accentLight, borderRadius: 8, marginBottom: 24,
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: theme.accent, marginBottom: 8 }}>管理员权限说明</div>
              <div style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>
                管理员可以：上传、编辑、删除素材文件，审核内容，查看数据统计。<br />
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

  const DeleteConfirmModal = () => (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }} onClick={() => setShowDeleteConfirm(null)}>
      <div style={{
        width: 400, backgroundColor: theme.cardBg, borderRadius: 8, padding: 24,
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
          您确定要删除 <strong style={{ color: theme.text }}>{showDeleteConfirm?.name}</strong> 吗？<br />
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

      {isSuperAdmin && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          <div style={{ padding: 20, backgroundColor: 'rgba(239, 68, 68, 0.08)', borderRadius: 6, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Shield size={20} color="#ef4444" />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#ef4444' }}>超级管理员</span>
            </div>
            <div style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>最高权限，可管理所有用户、管理员，拥有系统设置权限</div>
          </div>
          <div style={{ padding: 20, backgroundColor: 'rgba(139, 92, 246, 0.08)', borderRadius: 6, border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Users size={20} color="#8b5cf6" />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#8b5cf6' }}>管理员</span>
            </div>
            <div style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>可上传、编辑、删除素材，审核内容，查看统计数据</div>
          </div>
          <div style={{ padding: 20, backgroundColor: theme.bgTertiary, borderRadius: 6, border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <User size={20} color={theme.textSecondary} />
              <span style={{ fontSize: 14, fontWeight: 600, color: theme.textSecondary }}>普通用户</span>
            </div>
            <div style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>可浏览、搜索、下载素材文件</div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: '总用户数', value: users.length, color: theme.accent },
          { label: '超级管理员', value: users.filter(u => u.role === 'superadmin').length, color: '#ef4444' },
          { label: '管理员', value: users.filter(u => u.role === 'admin').length, color: '#8b5cf6' },
          { label: '普通用户', value: users.filter(u => u.role === 'user').length, color: theme.textSecondary },
        ].map((stat, i) => (
          <div key={i} style={{ padding: 20, backgroundColor: theme.cardBg, borderRadius: 6, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: stat.color, marginBottom: 4, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: theme.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

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
              padding: '8px 16px', fontSize: 13, fontWeight: 500,
              color: activeTab === tab.id ? theme.accent : theme.textSecondary,
              backgroundColor: activeTab === tab.id ? theme.accentLight : theme.bgTertiary,
              border: activeTab === tab.id ? `1px solid ${theme.accent}` : '1px solid transparent',
              borderRadius: 6, cursor: 'pointer',
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: theme.cardBg, borderRadius: 6, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
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
                    {(isSuperAdmin || (isAdmin && user.role === 'user')) && user.role !== 'superadmin' && (
                      <button
                        onClick={() => setEditUser(user)}
                        style={{
                          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backgroundColor: theme.bgTertiary, border: 'none', borderRadius: 6, cursor: 'pointer', color: theme.textSecondary,
                        }}
                        title="编辑"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                    {(isSuperAdmin && user.role !== 'superadmin') || (isAdmin && !isSuperAdmin && user.role === 'user') ? (
                      <button
                        onClick={() => setShowDeleteConfirm(user)}
                        style={{
                          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#ef4444',
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
}
