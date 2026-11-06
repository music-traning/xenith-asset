'use client';

import { useEffect } from 'react';

const GOOGLE_JP_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500&family=Noto+Sans+JP:wght@400;500&family=Noto+Serif+JP:wght@500;600&display=swap';

/**
 * 初期レンダリング（FCP / LCP）およびクリティカルリクエストチェーンをブロックしないよう、
 * ユーザーの初回操作（スクロール・ポインター移動・タッチ）またはアイドル後に
 * 日本語Webフォント（Noto Serif JP / Noto Sans JP）を非同期注入します。
 */
export const JapaneseFontLoader = (): null => {
  useEffect(() => {
    let loaded = false;

    const loadJapaneseFonts = (): void => {
      if (loaded) return;
      loaded = true;

      if (document.querySelector(`link[href="${GOOGLE_JP_FONTS_URL}"]`)) {
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = GOOGLE_JP_FONTS_URL;
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      document.head.appendChild(link);
    };

    const events: readonly (keyof WindowEventMap)[] = [
      'scroll',
      'mousemove',
      'touchstart',
      'keydown',
    ];

    const onUserInteraction = (): void => {
      loadJapaneseFonts();
      events.forEach((evt) =>
        window.removeEventListener(evt, onUserInteraction)
      );
    };

    events.forEach((evt) =>
      window.addEventListener(evt, onUserInteraction, {
        once: true,
        passive: true,
      })
    );

    // ユーザー操作がない場合でもLCP計測完了後にバックグラウンド読込
    const timerId = window.setTimeout(loadJapaneseFonts, 4000);

    return () => {
      window.clearTimeout(timerId);
      events.forEach((evt) =>
        window.removeEventListener(evt, onUserInteraction)
      );
    };
  }, []);

  return null;
};
