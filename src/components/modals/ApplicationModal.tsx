'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  Lock,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

export const OPEN_APPLICATION_MODAL_EVENT = 'xenith:open-application-modal';

/**
 * 任意のコンポーネントから審査申請モーダルを開くためのヘルパー関数
 */
export function triggerApplicationModal(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(OPEN_APPLICATION_MODAL_EVENT));
  }
}

export interface ApplicationModalProps {
  readonly isOpen?: boolean;
  readonly onClose?: () => void;
}

interface FormState {
  fullName: string;
  companyAndTitle: string;
  email: string;
  assetBracket: string;
}

const ASSET_BRACKET_OPTIONS: readonly {
  readonly value: string;
  readonly label: string;
}[] = [
  { value: '100m-500m', label: '1億円 〜 5億円' },
  { value: '500m-1b', label: '5億円 〜 10億円' },
  { value: '1b-3b', label: '10億円 〜 30億円' },
  { value: 'over-3b', label: '30億円以上（ファミリーオフィス・複数法人）' },
] as const;

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen: controlledIsOpen,
  onClose,
}) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    companyAndTitle: '',
    email: '',
    assetBracket: '100m-500m',
  });

  const isModalOpen = Boolean(controlledIsOpen) || internalOpen;

  const handleClose = (): void => {
    setInternalOpen(false);
    onClose?.();
    setTimeout(() => {
      setIsSubmitted(false);
    }, 300);
  };

  // カスタムイベントおよび #application-modal ハッシュクリックを監視
  useEffect(() => {
    const handleOpenEvent = (): void => {
      setInternalOpen(true);
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isModalOpen) {
        handleClose();
      }
    };

    window.addEventListener(OPEN_APPLICATION_MODAL_EVENT, handleOpenEvent);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener(OPEN_APPLICATION_MODAL_EVENT, handleOpenEvent);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  // モーダル表示中の背景スクロールロック
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="application-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* 背景オーバーレイ: bg-black/60 backdrop-blur-sm */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={handleClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* モーダル本体: bg-slate-900 border border-slate-700 rounded-2xl + scale: 0.95 -> 1, opacity: 0 -> 1 */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-glass sm:p-10"
          >
            {/* 上部シャンパンゴールド装飾ライン */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-custom-gold to-transparent"
            />

            {/* 右上の閉じるボタン (X アイコン) */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="モーダルを閉じる"
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-800/60 text-slate-400 transition-all duration-300 ease-in-out hover:border-custom-gold/60 hover:text-slate-50"
            >
              <X className="h-4 w-4" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* モーダルヘッダー */}
                <div className="inline-flex items-center gap-2 rounded-full border border-custom-gold/40 bg-slate-950 px-3.5 py-1">
                  <Lock
                    className="h-3.5 w-3.5 text-custom-gold"
                    aria-hidden="true"
                  />
                  <span className="font-serif text-[11px] font-medium tracking-[0.2em] text-custom-gold-light">
                    STRICTLY CONFIDENTIAL // INVITATION ONLY
                  </span>
                </div>

                <h3
                  id="application-modal-title"
                  className="mt-4 font-serif text-2xl font-semibold tracking-wide text-slate-50 sm:text-3xl"
                >
                  非公開物件アクセス権 審査申請
                </h3>
                <p className="mt-2 font-sans text-xs font-normal leading-relaxed text-slate-400 sm:text-sm">
                  ご入力いただいた情報は金融機関水準の暗号化通信により保護され、秘密保持契約（NDA）に基づき厳重に管理されます。
                </p>

                {/* 審査申請フォーム */}
                <form onSubmit={handleSubmit} className="mt-7 space-y-5 font-sans">
                  {/* お名前 */}
                  <div>
                    <label
                      htmlFor="applicant-name"
                      className="block text-xs font-medium tracking-wider text-slate-300"
                    >
                      お名前 <span className="text-custom-gold">*</span>
                    </label>
                    <input
                      id="applicant-name"
                      type="text"
                      required
                      placeholder="例：神宮寺 慶一"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-50 placeholder-slate-500 transition-all duration-300 focus:border-custom-gold focus:outline-none focus:ring-1 focus:ring-custom-gold"
                    />
                  </div>

                  {/* 会社名 / 役職 */}
                  <div>
                    <label
                      htmlFor="applicant-company"
                      className="block text-xs font-medium tracking-wider text-slate-300"
                    >
                      会社名・医療法人名 / 役職{' '}
                      <span className="text-custom-gold">*</span>
                    </label>
                    <input
                      id="applicant-company"
                      type="text"
                      required
                      placeholder="例：医療法人社団 慶翔会 理事長 / 株式会社K・ホールディングス 代表取締役"
                      value={formData.companyAndTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyAndTitle: e.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-50 placeholder-slate-500 transition-all duration-300 focus:border-custom-gold focus:outline-none focus:ring-1 focus:ring-custom-gold"
                    />
                  </div>

                  {/* 連絡先メールアドレス */}
                  <div>
                    <label
                      htmlFor="applicant-email"
                      className="block text-xs font-medium tracking-wider text-slate-300"
                    >
                      プライベート連絡先メールアドレス{' '}
                      <span className="text-custom-gold">*</span>
                    </label>
                    <input
                      id="applicant-email"
                      type="email"
                      required
                      placeholder="executive@example.jp"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-50 placeholder-slate-500 transition-all duration-300 focus:border-custom-gold focus:outline-none focus:ring-1 focus:ring-custom-gold"
                    />
                  </div>

                  {/* 現在の金融資産規模 (セレクトボックス) */}
                  <div>
                    <label
                      htmlFor="applicant-asset-bracket"
                      className="block text-xs font-medium tracking-wider text-slate-300"
                    >
                      現在の金融資産規模（個人・資産管理会社合算）{' '}
                      <span className="text-custom-gold">*</span>
                    </label>
                    <select
                      id="applicant-asset-bracket"
                      value={formData.assetBracket}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assetBracket: e.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-slate-50 transition-all duration-300 focus:border-custom-gold focus:outline-none focus:ring-1 focus:ring-custom-gold"
                    >
                      {ASSET_BRACKET_OPTIONS.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="bg-slate-900 text-slate-50"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 送信ボタン: ホバー時に shadow-gold-glow が発光 */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-custom-gold-light/40 bg-custom-gold px-6 py-4 font-sans text-sm font-semibold tracking-wider text-slate-950 transition-all duration-300 ease-in-out hover:bg-custom-gold-light hover:shadow-gold-glow active:bg-custom-gold-dark sm:text-base"
                    >
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      <span>審査リクエストを送信する</span>
                    </button>
                  </div>

                  <p className="flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
                    <ShieldCheck
                      className="h-3.5 w-3.5 text-custom-gold"
                      aria-hidden="true"
                    />
                    <span>営業電話や無断での資料郵送は一切行いません</span>
                  </p>
                </form>
              </div>
            ) : (
              /* 送信完了後のコンファメーション画面 */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="py-8 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-custom-gold/50 bg-custom-gold/15 text-custom-gold-light shadow-gold-glow">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <p className="mt-5 font-serif text-xs uppercase tracking-[0.24em] text-custom-gold">
                  APPLICATION RECEIVED
                </p>
                <h4 className="mt-2 font-serif text-2xl font-semibold text-slate-50">
                  審査リクエストを受け付けました
                </h4>
                <p className="mx-auto mt-4 max-w-md font-sans text-sm font-normal leading-relaxed text-slate-400">
                  {formData.fullName ? `${formData.fullName} 様、` : ''}
                  ご申請ありがとうございます。審査委員会による一次確認後、24時間以内に専任コンシェルジュより暗号化メールにて専用招待リンクをご案内いたします。
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex items-center justify-center rounded-xl border border-custom-gold/50 bg-slate-800/60 px-8 py-3 font-sans text-xs font-medium tracking-wider text-custom-gold-light transition-all duration-300 hover:border-custom-gold hover:shadow-gold-glow"
                  >
                    コンソール画面へ戻る
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};

export default ApplicationModal;
