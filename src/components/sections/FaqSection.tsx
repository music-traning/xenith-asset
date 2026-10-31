'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ShieldAlert } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/lpContentData';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<readonly string[]>(['faq-eligibility']);

  const toggleItem = (id: string): void => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative bg-slate-950 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        {/* セクション見出し */}
        <SectionHeading
          id="faq-heading"
          eyebrowEn="FREQUENTLY ASKED QUESTIONS"
          title="審査・ご入会に関するよくあるご質問"
        />

        {/* 開閉式アコーディオンリスト */}
        <div className="mt-16 space-y-6 lg:mt-20">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIds.includes(item.id);
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.12,
                  ease: 'easeOut',
                }}
                className={`overflow-hidden rounded-2xl border bg-slate-800/40 shadow-glass backdrop-blur-md transition-all duration-300 ease-in-out ${
                  isOpen
                    ? 'border-custom-gold shadow-gold-glow'
                    : 'border-slate-700/50 hover:border-custom-gold/50'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`${item.question} の回答を${isOpen ? '閉じる' : '開く'}`}
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left focus:outline-none sm:px-9 sm:py-7"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-custom-gold/50 bg-slate-950 font-serif text-sm font-semibold text-custom-gold-light"
                      >
                        {item.code}
                      </span>
                      <span className="font-serif text-lg font-medium tracking-wide text-slate-50 sm:text-xl">
                        {item.question}
                      </span>
                    </div>

                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700/50 bg-slate-950 text-custom-gold"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>

                {/* AnimatePresence による height の滑らかなアニメーション */}
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-700/50 px-7 pt-5 pb-7 font-sans sm:px-9 sm:pb-8">
                        <p className="text-base font-normal leading-[1.9] text-slate-50">
                          {item.answer}
                        </p>

                        {item.supplementaryNote ? (
                          <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-700/50 bg-slate-950/80 p-4 text-xs font-normal leading-relaxed text-slate-400">
                            <ShieldAlert
                              className="mt-0.5 h-4 w-4 shrink-0 text-custom-gold"
                              aria-hidden="true"
                            />
                            <span>{item.supplementaryNote}</span>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
