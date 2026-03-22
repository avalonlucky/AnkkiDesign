import React, { useState } from 'react';
import { Lightbulb, Bug, ThumbsUp, MessageSquare, Check, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

const feedbackTypes = [
  { id: 'feature', name: '功能建议', icon: Lightbulb, color: '#f59e0b', desc: '对产品功能的改进建议' },
  { id: 'bug', name: 'Bug反馈', icon: Bug, color: '#ef4444', desc: '报告使用中遇到的问题' },
  { id: 'experience', name: '体验优化', icon: ThumbsUp, color: '#10b981', desc: '关于用户体验的建议' },
  { id: 'other', name: '其他反馈', icon: MessageSquare, color: '#8b5cf6', desc: '其他类型的反馈意见' },
];

function getStatusInfo(status, theme) {
  switch (status) {
    case 'pending': return { name: '待处理', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
    case 'processing': return { name: '处理中', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' };
    case 'resolved': return { name: '已解决', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' };
    case 'rejected': return { name: '已关闭', color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' };
    default: return { name: '未知', color: theme.textMuted, bg: theme.bgTertiary };
  }
}

// ─── User Feedback View ───────────────────────────────────────────────────────
function UserFeedbackView({ theme }) {
  const [feedbackType, setFeedbackType] = useState('feature');
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const myFeedbacks = [
    { id: 1, type: 'feature', title: '希望增加批量下载功能', status: 'processing', createdAt: '2024-01-14', reply: null },
    { id: 2, type: 'bug', title: 'PPT预览时偶尔加载失败', status: 'resolved', createdAt: '2024-01-10', reply: '感谢反馈，问题已修复，请刷新页面重试。' },
    { id: 3, type: 'experience', title: '建议优化搜索结果排序', status: 'pending', createdAt: '2024-01-08', reply: null },
  ];

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
          borderRadius: 6,
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
        }}>
          <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>提交反馈</h3>
          </div>
          <div style={{ padding: 24 }}>
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
                      borderRadius: 5,
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

            {submitted ? (
              <div style={{
                padding: 16, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 8,
                display: 'flex', alignItems: 'center', gap: 12,
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
          borderRadius: 6,
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
        }}>
          <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>我的反馈</h3>
          </div>
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
            {myFeedbacks.length > 0 ? myFeedbacks.map((feedback, i) => {
              const statusInfo = getStatusInfo(feedback.status, theme);
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
                      marginTop: 10, padding: 12, backgroundColor: theme.bgTertiary,
                      borderRadius: 8, borderLeft: `3px solid ${theme.accent}`,
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
}

// ─── Admin Feedback View ──────────────────────────────────────────────────────
function AdminFeedbackView({ theme, darkMode }) {
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

  const filteredFeedbacks = activeTab === 'all' ? allFeedbacks : allFeedbacks.filter(f => f.status === activeTab);

  const stats = [
    { label: '全部反馈', value: allFeedbacks.length, color: theme.accent },
    { label: '待处理', value: allFeedbacks.filter(f => f.status === 'pending').length, color: '#f59e0b' },
    { label: '处理中', value: allFeedbacks.filter(f => f.status === 'processing').length, color: '#3b82f6' },
    { label: '已解决', value: allFeedbacks.filter(f => f.status === 'resolved').length, color: '#10b981' },
  ];

  const FeedbackDetailModal = () => {
    if (!selectedFeedback) return null;
    const statusInfo = getStatusInfo(selectedFeedback.status, theme);
    const typeInfo = feedbackTypes.find(t => t.id === selectedFeedback.type);

    return (
      <div style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      }} onClick={() => setSelectedFeedback(null)}>
        <div style={{
          width: 560, maxHeight: '90vh', backgroundColor: theme.cardBg, borderRadius: 8, overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }} onClick={e => e.stopPropagation()}>
          <div style={{
            padding: '20px 24px', borderBottom: `1px solid ${theme.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {typeInfo && (
                <div style={{
                  width: 40, height: 40, borderRadius: 5, backgroundColor: `${typeInfo.color}15`,
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

            <div style={{ padding: 16, backgroundColor: theme.bgTertiary, borderRadius: 5, marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: theme.text, lineHeight: 1.8 }}>{selectedFeedback.content}</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 12 }}>提交于 {selectedFeedback.createdAt}</div>
            </div>

            {selectedFeedback.reply && (
              <div style={{
                padding: 16, backgroundColor: 'rgba(217, 119, 87, 0.08)', borderRadius: 5,
                borderLeft: `3px solid ${theme.accent}`, marginBottom: 20,
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.accent, marginBottom: 8 }}>官方回复</div>
                <div style={{ fontSize: 14, color: theme.text, lineHeight: 1.6 }}>{selectedFeedback.reply}</div>
              </div>
            )}

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            padding: 20, backgroundColor: theme.cardBg, borderRadius: 6, border: `1px solid ${theme.border}`,
          }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: stat.color, marginBottom: 4, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: theme.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

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
              border: activeTab === tab.id ? `1px solid ${theme.accent}` : '1px solid transparent',
              borderRadius: 6, cursor: 'pointer',
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div style={{
        backgroundColor: theme.cardBg, borderRadius: 6, border: `1px solid ${theme.border}`, overflow: 'hidden',
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
            {filteredFeedbacks.map((feedback) => {
              const statusInfo = getStatusInfo(feedback.status, theme);
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
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function FeedbackView() {
  const { isAdmin, theme, darkMode } = useApp();
  if (isAdmin) return <AdminFeedbackView theme={theme} darkMode={darkMode} />;
  return <UserFeedbackView theme={theme} />;
}
