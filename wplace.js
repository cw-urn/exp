; (async () => {
  // CONFIGURATION CONSTANTS
  const CONFIG = {
    COOLDOWN_DEFAULT: 31000,
    TRANSPARENCY_THRESHOLD: 100,
    WHITE_THRESHOLD: 250,
    LOG_INTERVAL: 10,
    PAINTING_SPEED: {
      MIN: 1, // Minimum 1 pixel batch size
      MAX: 1000, // Maximum 1000 pixels batch size
      DEFAULT: 5, // Default 5 pixels batch size
    },
    BATCH_MODE: "normal", // "normal" or "random" - default to normal
    RANDOM_BATCH_RANGE: {
      MIN: 3, // Random range minimum
      MAX: 20, // Random range maximum
    },
    PAINTING_SPEED_ENABLED: false, // Off by default
    AUTO_CAPTCHA_ENABLED: true, // Turnstile generator enabled by default
    TOKEN_SOURCE: "generator", // "generator", "manual", or "hybrid" - default to generator
    COOLDOWN_CHARGE_THRESHOLD: 1, // Default wait threshold
    // Desktop Notifications (defaults)
    NOTIFICATIONS: {
      ENABLED: true,
      ON_CHARGES_REACHED: true,
      ONLY_WHEN_UNFOCUSED: true,
      REPEAT_MINUTES: 5, // repeat reminder while threshold condition holds
    },
    OVERLAY: {
      OPACITY_DEFAULT: 0.6,
      BLUE_MARBLE_DEFAULT: false,
      ditheringEnabled: false,
    },
    // --- START: Color data from colour-converter.js ---
    // New color structure with proper ID mapping
    COLOR_MAP: {
      0: { id: 1, name: 'Black', rgb: { r: 0, g: 0, b: 0 } },
      1: { id: 2, name: 'Dark Gray', rgb: { r: 60, g: 60, b: 60 } },
      2: { id: 3, name: 'Gray', rgb: { r: 120, g: 120, b: 120 } },
      3: { id: 4, name: 'Light Gray', rgb: { r: 210, g: 210, b: 210 } },
      4: { id: 5, name: 'White', rgb: { r: 255, g: 255, b: 255 } },
      5: { id: 6, name: 'Deep Red', rgb: { r: 96, g: 0, b: 24 } },
      6: { id: 7, name: 'Red', rgb: { r: 237, g: 28, b: 36 } },
      7: { id: 8, name: 'Orange', rgb: { r: 255, g: 127, b: 39 } },
      8: { id: 9, name: 'Gold', rgb: { r: 246, g: 170, b: 9 } },
      9: { id: 10, name: 'Yellow', rgb: { r: 249, g: 221, b: 59 } },
      10: { id: 11, name: 'Light Yellow', rgb: { r: 255, g: 250, b: 188 } },
      11: { id: 12, name: 'Dark Green', rgb: { r: 14, g: 185, b: 104 } },
      12: { id: 13, name: 'Green', rgb: { r: 19, g: 230, b: 123 } },
      13: { id: 14, name: 'Light Green', rgb: { r: 135, g: 255, b: 94 } },
      14: { id: 15, name: 'Dark Teal', rgb: { r: 12, g: 129, b: 110 } },
      15: { id: 16, name: 'Teal', rgb: { r: 16, g: 174, b: 166 } },
      16: { id: 17, name: 'Light Teal', rgb: { r: 19, g: 225, b: 190 } },
      17: { id: 20, name: 'Cyan', rgb: { r: 96, g: 247, b: 242 } },
      18: { id: 44, name: 'Light Cyan', rgb: { r: 187, g: 250, b: 242 } },
      19: { id: 18, name: 'Dark Blue', rgb: { r: 40, g: 80, b: 158 } },
      20: { id: 19, name: 'Blue', rgb: { r: 64, g: 147, b: 228 } },
      21: { id: 21, name: 'Indigo', rgb: { r: 107, g: 80, b: 246 } },
      22: { id: 22, name: 'Light Indigo', rgb: { r: 153, g: 177, b: 251 } },
      23: { id: 23, name: 'Dark Purple', rgb: { r: 120, g: 12, b: 153 } },
      24: { id: 24, name: 'Purple', rgb: { r: 170, g: 56, b: 185 } },
      25: { id: 25, name: 'Light Purple', rgb: { r: 224, g: 159, b: 249 } },
      26: { id: 26, name: 'Dark Pink', rgb: { r: 203, g: 0, b: 122 } },
      27: { id: 27, name: 'Pink', rgb: { r: 236, g: 31, b: 128 } },
      28: { id: 28, name: 'Light Pink', rgb: { r: 243, g: 141, b: 169 } },
      29: { id: 29, name: 'Dark Brown', rgb: { r: 104, g: 70, b: 52 } },
      30: { id: 30, name: 'Brown', rgb: { r: 149, g: 104, b: 42 } },
      31: { id: 31, name: 'Beige', rgb: { r: 248, g: 178, b: 119 } },
      32: { id: 52, name: 'Light Beige', rgb: { r: 255, g: 197, b: 165 } },
      33: { id: 32, name: 'Medium Gray', rgb: { r: 170, g: 170, b: 170 } },
      34: { id: 33, name: 'Dark Red', rgb: { r: 165, g: 14, b: 30 } },
      35: { id: 34, name: 'Light Red', rgb: { r: 250, g: 128, b: 114 } },
      36: { id: 35, name: 'Dark Orange', rgb: { r: 228, g: 92, b: 26 } },
      37: { id: 37, name: 'Dark Goldenrod', rgb: { r: 156, g: 132, b: 49 } },
      38: { id: 38, name: 'Goldenrod', rgb: { r: 197, g: 173, b: 49 } },
      39: { id: 39, name: 'Light Goldenrod', rgb: { r: 232, g: 212, b: 95 } },
      40: { id: 40, name: 'Dark Olive', rgb: { r: 74, g: 107, b: 58 } },
      41: { id: 41, name: 'Olive', rgb: { r: 90, g: 148, b: 74 } },
      42: { id: 42, name: 'Light Olive', rgb: { r: 132, g: 197, b: 115 } },
      43: { id: 43, name: 'Dark Cyan', rgb: { r: 15, g: 121, b: 159 } },
      44: { id: 45, name: 'Light Blue', rgb: { r: 125, g: 199, b: 255 } },
      45: { id: 46, name: 'Dark Indigo', rgb: { r: 77, g: 49, b: 184 } },
      46: { id: 47, name: 'Dark Slate Blue', rgb: { r: 74, g: 66, b: 132 } },
      47: { id: 48, name: 'Slate Blue', rgb: { r: 122, g: 113, b: 196 } },
      48: { id: 49, name: 'Light Slate Blue', rgb: { r: 181, g: 174, b: 241 } },
      49: { id: 53, name: 'Dark Peach', rgb: { r: 155, g: 82, b: 73 } },
      50: { id: 54, name: 'Peach', rgb: { r: 209, g: 128, b: 120 } },
      51: { id: 55, name: 'Light Peach', rgb: { r: 250, g: 182, b: 164 } },
      52: { id: 50, name: 'Light Brown', rgb: { r: 219, g: 164, b: 99 } },
      53: { id: 56, name: 'Dark Tan', rgb: { r: 123, g: 99, b: 82 } },
      54: { id: 57, name: 'Tan', rgb: { r: 156, g: 132, b: 107 } },
      55: { id: 36, name: 'Light Tan', rgb: { r: 214, g: 181, b: 148 } },
      56: { id: 51, name: 'Dark Beige', rgb: { r: 209, g: 128, b: 81 } },
      57: { id: 61, name: 'Dark Stone', rgb: { r: 109, g: 100, b: 63 } },
      58: { id: 62, name: 'Stone', rgb: { r: 148, g: 140, b: 107 } },
      59: { id: 63, name: 'Light Stone', rgb: { r: 205, g: 197, b: 158 } },
      60: { id: 58, name: 'Dark Slate', rgb: { r: 51, g: 57, b: 65 } },
      61: { id: 59, name: 'Slate', rgb: { r: 109, g: 117, b: 141 } },
      62: { id: 60, name: 'Light Slate', rgb: { r: 179, g: 185, b: 209 } },
      63: { id: 0, name: 'Transparent', rgb: null }
    },
    // --- END: Color data ---
    // Optimized CSS Classes for reuse
    CSS_CLASSES: {
      BUTTON_PRIMARY: `
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white; border: none; border-radius: 8px; padding: 10px 16px;
        cursor: pointer; font-weight: 500; transition: all 0.3s ease;
        display: flex; align-items: center; gap: 8px;
      `,
      BUTTON_SECONDARY: `
        background: rgba(255,255,255,0.1); color: white;
        border: 1px solid rgba(255,255,255,0.2); border-radius: 8px;
        padding: 8px 12px; cursor: pointer; transition: all 0.3s ease;
      `,
      MODERN_CARD: `
        background: rgba(255,255,255,0.1); border-radius: 12px;
        padding: 18px; border: 1px solid rgba(255,255,255,0.1);
        backdrop-filter: blur(5px);
      `,
      GRADIENT_TEXT: `
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text; font-weight: bold;
      `
    },
    THEMES: {
      "Classic Autobot": {
        primary: "#000000",
        secondary: "#111111",
        accent: "#222222",
        text: "#ffffff",
        highlight: "#775ce3",
        success: "#00ff00",
        error: "#ff0000",
        warning: "#ffaa00",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        borderRadius: "12px",
        borderStyle: "solid",
        borderWidth: "1px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        animations: {
          glow: false,
          scanline: false,
          pixelBlink: false,
        },
      },
      "Classic Light": {
        primary: "#ffffff",
        secondary: "#f8f9fa",
        accent: "#e9ecef",
        text: "#212529",
        highlight: "#6f42c1",
        success: "#28a745",
        error: "#dc3545",
        warning: "#ffc107",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        borderRadius: "12px",
        borderStyle: "solid",
        borderWidth: "1px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)",
        backdropFilter: "blur(10px)",
        animations: {
          glow: false,
          scanline: false,
          pixelBlink: false,
        },
      },
      "Neon Retro": {
        primary: "#1a1a2e",
        secondary: "#16213e",
        accent: "#0f3460",
        text: "#00ff41",
        highlight: "#ff6b35",
        success: "#39ff14",
        error: "#ff073a",
        warning: "#ffff00",
        neon: "#00ffff",
        purple: "#bf00ff",
        pink: "#ff1493",
        fontFamily: "'Press Start 2P', monospace",
        borderRadius: "0",
        borderStyle: "solid",
        borderWidth: "3px",
        boxShadow: "0 0 20px rgba(0, 255, 65, 0.3), inset 0 0 20px rgba(0, 255, 65, 0.1)",
        backdropFilter: "none",
        animations: {
          glow: true,
          scanline: true,
          pixelBlink: true,
        },
      },
    },
    currentTheme: "Classic Autobot",
  }

  const getCurrentTheme = () => CONFIG.THEMES[CONFIG.currentTheme]

  const switchTheme = (themeName) => {
    if (CONFIG.THEMES[themeName]) {
      CONFIG.currentTheme = themeName
      saveThemePreference()

      // APPLY THEME VARS/CLASS (new)
      applyTheme()

      // Recreate UI (kept for now)
      createUI()
    }
  }

  // Add this helper (place it after getCurrentTheme/switchTheme definitions)
  function applyTheme() {
    const theme = getCurrentTheme();
    // Toggle theme class on documentElement so CSS vars cascade to our UI
    document.documentElement.classList.remove('wplace-theme--classic', 'wplace-theme--classic-light', 'wplace-theme--neon');

    let themeClass = 'wplace-theme--classic'; // default
    if (CONFIG.currentTheme === 'Neon Retro') {
      themeClass = 'wplace-theme--neon';
    } else if (CONFIG.currentTheme === 'Classic Light') {
      themeClass = 'wplace-theme--classic-light';
    }

    document.documentElement.classList.add(themeClass);

    // Also set CSS variables explicitly in case you want runtime overrides
    const root = document.documentElement;
    const setVar = (k, v) => {
      try {
        root.style.setProperty(k, v);
      } catch {}
    };

    setVar('--wplace-primary', theme.primary);
    setVar('--wplace-secondary', theme.secondary);
    setVar('--wplace-accent', theme.accent);
    setVar('--wplace-text', theme.text);
    setVar('--wplace-highlight', theme.highlight);
    setVar('--wplace-success', theme.success);
    setVar('--wplace-error', theme.error);
    setVar('--wplace-warning', theme.warning);

    // Typography + look
    setVar('--wplace-font', theme.fontFamily || "'Segoe UI', Roboto, sans-serif");
    setVar('--wplace-radius', ('' + (theme.borderRadius || '12px')));
    setVar('--wplace-border-style', (('' + (theme.borderStyle || 'solid'))));
    setVar('--wplace-border-width', (('' + (theme.borderWidth || '1px'))));
    setVar('--wplace-backdrop', (('' + (theme.backdropFilter || 'blur(10px)'))));
    setVar('--wplace-border-color', 'rgba(255,255,255,0.1)');
  }



  const saveThemePreference = () => {
    try {
      localStorage.setItem("wplace-theme", CONFIG.currentTheme)
    } catch (e) {
      console.warn("Could not save theme preference:", e)
    }
  }

  const loadThemePreference = () => {
    try {
      const saved = localStorage.getItem("wplace-theme")
      if (saved && CONFIG.THEMES[saved]) {
        CONFIG.currentTheme = saved
      }
    } catch (e) {
      console.warn("Could not load theme preference:", e)
    }
  }

  const loadLanguagePreference = () => {
    try {
      const saved = localStorage.getItem("wplace_language")
      if (saved && TEXT[saved]) {
        state.language = saved
      }
    } catch (e) {
      console.warn("Could not load language preference:", e)
    }
  }

  // BILINGUAL TEXT STRINGS:)
  const TEXT = {
    en: {
      title: "WPlace Auto-Image",
      toggleOverlay: "Toggle Overlay",
      scanColors: "Scan Colors",
      uploadImage: "Upload Image",
      resizeImage: "Resize Image",
      selectPosition: "Select Position",
      startPainting: "Start Painting",
      stopPainting: "Stop Painting",
      checkingColors: "🔍 Checking available colors...",
      noColorsFound: "❌ Open the color palette on the site and try again!",
      colorsFound: "✅ {count} available colors found. Ready to upload.",
      loadingImage: "🖼️ Loading image...",
      imageLoaded: "✅ Image loaded with {count} valid pixels",
      imageError: "❌ Error loading image",
      selectPositionAlert: "Paint the first pixel at the location where you want the art to start!",
      waitingPosition: "👆 Waiting for you to paint the reference pixel...",
      positionSet: "✅ Position set successfully!",
      positionTimeout: "❌ Timeout for position selection",
      startPaintingMsg: "🎨 Starting painting...",
      paintingProgress: "🧱 Progress: {painted}/{total} pixels...",
      noCharges: "⌛ No charges. Waiting {time}...",
      paintingStopped: "⏹️ Painting stopped by user",
      paintingComplete: "✅ Painting complete! {count} pixels painted.",
      paintingError: "❌ Error during painting",
      missingRequirements: "❌ Load an image and select a position first",
      progress: "Progress",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Estimated time",
      initMessage: "Click 'Upload Image' to begin",
      waitingInit: "Waiting for initialization...",
      initializingToken: "🔧 Initializing Turnstile token generator...",
      tokenReady: "✅ Token generator ready - you can now start painting!",
      tokenRetryLater: "⚠️ Token generator will retry when needed",
      resizeSuccess: "✅ Image resized to {width}x{height}",
      paintingPaused: "⏸️ Painting paused at position X: {x}, Y: {y}",
      captchaNeeded: "❗ Token generation failed. Please try again in a moment.",
      saveData: "Save Progress",
      loadData: "Load Progress",
      saveToFile: "Save to File",
      loadFromFile: "Load from File",
      dataManager: "Data Manager",
      autoSaved: "✅ Progress saved automatically",
      dataLoaded: "✅ Progress loaded successfully",
      fileSaved: "✅ Progress saved to file successfully",
      fileLoaded: "✅ Progress loaded from file successfully",
      noSavedData: "❌ No saved progress found",
      savedDataFound: "✅ Saved progress found! Load to continue?",
      savedDate: "Saved on: {date}",
      clickLoadToContinue: "Click 'Load Progress' to continue.",
      fileError: "❌ Error processing file",
      invalidFileFormat: "❌ Invalid file format",
      paintingSpeed: "Painting Speed",
      pixelsPerSecond: "pixels/second",
      speedSetting: "Speed: {speed} pixels/sec",
      settings: "Settings",
      botSettings: "Bot Settings",
      close: "Close",
      language: "Language",
      themeSettings: "Theme Settings",
      themeSettingsDesc: "Choose your preferred color theme for the interface.",
      languageSelectDesc: "Select your preferred language. Changes will take effect immediately.",
      autoCaptcha: "Auto-CAPTCHA Solver (Turnstile)",
      autoCaptchaDesc: "Automatically generates Turnstile tokens using integrated generator. Falls back to browser automation if needed.",
      applySettings: "Apply Settings",
      settingsSaved: "✅ Settings saved successfully!",
      cooldownSettings: "Cooldown Settings",
      waitCharges: "Wait until charges reach",
      captchaSolving: "🔑 Generating Turnstile token...",
      captchaFailed: "❌ Turnstile token generation failed. Trying fallback method...",
      automation: "Automation",
      noChargesThreshold: "⌛ Waiting for charges to reach {threshold}. Currently {current}. Next in {time}...",
    },
    ru: {
      title: "WPlace Авто-Изображение",
      scanColors: "Сканировать цвета",
      uploadImage: "Загрузить изображение",
      resizeImage: "Изменить размер изображения",
      selectPosition: "Выбрать позицию",
      startPainting: "Начать рисование",
      stopPainting: "Остановить рисование",
      checkingColors: "🔍 Проверка доступных цветов...",
      noColorsFound: "❌ Откройте палитру цветов на сайте и попробуйте снова!",
      colorsFound: "✅ Найдено доступных цветов: {count}. Готово к загрузке.",
      loadingImage: "🖼️ Загрузка изображения...",
      imageLoaded: "✅ Изображение загружено, валидных пикселей: {count}",
      imageError: "❌ Ошибка при загрузке изображения",
      selectPositionAlert: "Нарисуйте первый пиксель в месте, откуда начнётся рисунок!",
      waitingPosition: "👆 Ожидание, пока вы нарисуете опорный пиксель...",
      positionSet: "✅ Позиция успешно установлена!",
      positionTimeout: "❌ Время ожидания выбора позиции истекло",
      startPaintingMsg: "🎨 Начинаем рисование...",
      paintingProgress: "🧱 Прогресс: {painted}/{total} пикселей...",
      noCharges: "⌛ Нет зарядов. Ожидание {time}...",
      paintingStopped: "⏹️ Рисование остановлено пользователем",
      paintingComplete: "✅ Рисование завершено! Нарисовано пикселей: {count}.",
      paintingError: "❌ Ошибка во время рисования",
      missingRequirements: "❌ Сначала загрузите изображение и выберите позицию",
      progress: "Прогресс",
      pixels: "Пиксели",
      charges: "Заряды",
      estimatedTime: "Примерное время",
      initMessage: "Нажмите 'Загрузить изображение', чтобы начать",
      waitingInit: "Ожидание инициализации...",
      initializingToken: "🔧 Инициализация генератора Turnstile токенов...",
      tokenReady: "✅ Генератор токенов готов - можете начинать рисование!",
      tokenRetryLater: "⚠️ Генератор токенов повторит попытку при необходимости",
      resizeSuccess: "✅ Изображение изменено до {width}x{height}",
      paintingPaused: "⏸️ Рисование приостановлено на позиции X: {x}, Y: {y}",
      captchaNeeded: "❗ Генерация токена не удалась. Пожалуйста, попробуйте через некоторое время.",
      saveData: "Сохранить прогресс",
      loadData: "Загрузить прогресс",
      saveToFile: "Сохранить в файл",
      loadFromFile: "Загрузить из файла",
      dataManager: "Менеджер данных",
      autoSaved: "✅ Прогресс сохранён автоматически",
      dataLoaded: "✅ Прогресс успешно загружен",
      fileSaved: "✅ Прогресс успешно сохранён в файл",
      fileLoaded: "✅ Прогресс успешно загружен из файла",
      noSavedData: "❌ Сохранённый прогресс не найден",
      savedDataFound: "✅ Найден сохранённый прогресс! Загрузить, чтобы продолжить?",
      savedDate: "Сохранено: {date}",
      clickLoadToContinue: "Нажмите 'Загрузить прогресс', чтобы продолжить.",
      fileError: "❌ Ошибка при обработке файла",
      invalidFileFormat: "❌ Неверный формат файла",
      paintingSpeed: "Скорость рисования",
      pixelsPerSecond: "пикселей/сек",
      speedSetting: "Скорость: {speed} пикс./сек",
      settings: "Настройки",
      botSettings: "Настройки бота",
      close: "Закрыть",
      language: "Язык",
      themeSettings: "Настройки темы",
      themeSettingsDesc: "Выберите предпочтительную цветовую тему интерфейса.",
      languageSelectDesc: "Выберите предпочтительный язык. Изменения вступят в силу немедленно.",
      autoCaptcha: "Авто-решение CAPTCHA (Turnstile)",
      autoCaptchaDesc: "Автоматически генерирует Turnstile токены используя встроенный генератор. Возвращается к автоматизации браузера при необходимости.",
      applySettings: "Применить настройки",
      settingsSaved: "✅ Настройки успешно сохранены!",
      cooldownSettings: "Настройки перезарядки",
      waitCharges: "Ждать до накопления зарядов",
      captchaSolving: "🔑 Генерирую Turnstile токен...",
      captchaFailed: "❌ Не удалось сгенерировать Turnstile токен. Пробую резервный метод...",
      automation: "Автоматизация",
      noChargesThreshold: "⌛ Ожидание зарядов до {threshold}. Сейчас {current}. Следующий через {time}...",
    },
    pt: {
      title: "WPlace Auto-Image",
      scanColors: "Escanear Cores",
      uploadImage: "Upload da Imagem",
      resizeImage: "Redimensionar Imagem",
      selectPosition: "Selecionar Posição",
      startPainting: "Iniciar Pintura",
      stopPainting: "Parar Pintura",
      checkingColors: "🔍 Verificando cores disponíveis...",
      noColorsFound: "❌ Abra a paleta de cores no site e tente novamente!",
      colorsFound: "✅ {count} cores encontradas. Pronto para upload.",
      loadingImage: "🖼️ Carregando imagem...",
      imageLoaded: "✅ Imagem carregada com {count} pixels válidos",
      imageError: "❌ Erro ao carregar imagem",
      selectPositionAlert: "Pinte o primeiro pixel на localização onde deseja que a arte comece!",
      waitingPosition: "👆 Aguardando você pintar o pixel de referência...",
      positionSet: "✅ Posição definida com sucesso!",
      positionTimeout: "❌ Tempo esgotado para selecionar posição",
      startPaintingMsg: "🎨 Iniciando pintura...",
      paintingProgress: "🧱 Progresso: {painted}/{total} pixels...",
      noCharges: "⌛ Sem cargas. Aguardando {time}...",
      paintingStopped: "⏹️ Pintura interromпида pelo usuário",
      paintingComplete: "✅ Pintura concluída! {count} pixels pintados.",
      paintingError: "❌ Erro durante a pintura",
      missingRequirements: "❌ Carregue uma imagem e selecione uma posição primeiro",
      progress: "Progresso",
      pixels: "Pixels",
      charges: "Cargas",
      estimatedTime: "Tempo estimado",
      initMessage: "Clique em 'Upload da Imagem' para começar",
      waitingInit: "Aguardando inicialização...",
      initializingToken: "🔧 Inicializando gerador de tokens Turnstile...",
      tokenReady: "✅ Gerador de tokens pronto - você pode começar a pintar!",
      tokenRetryLater: "⚠️ Gerador de tokens tentará novamente quando necessário",
      resizeSuccess: "✅ Imagem redimensionada для {width}x{height}",
      paintingPaused: "⏸️ Pintura pausada na posição X: {x}, Y: {y}",
      captchaNeeded: "❗ Falha na geração de token. Tente novamente em alguns instantes.",
      saveData: "Salvar Progresso",
      loadData: "Carregar Progresso",
      saveToFile: "Salvar em Arquivo",
      loadFromFile: "Carregar de Arquivo",
      dataManager: "Dados",
      autoSaved: "✅ Progresso salvo automaticamente",
      dataLoaded: "✅ Progresso carregado com sucesso",
      fileSaved: "✅ Salvo em arquivo com sucesso",
      fileLoaded: "✅ Carregado de arquivo com sucesso",
      noSavedData: "❌ Nenhum progresso salvo encontrado",
      savedDataFound: "✅ Progresso salvo encontrado! Carregar para continuar?",
      savedDate: "Salvo em: {date}",
      clickLoadToContinue: "Clique em 'Carregar Progresso' para continuar.",
      fileError: "❌ Erro ao processar arquivo",
      invalidFileFormat: "❌ Formato de arquivo inválido",
      paintingSpeed: "Velocidade de Pintura",
      pixelsPerSecond: "pixels/segundo",
      speedSetting: "Velocidade: {speed} pixels/seg",
      settings: "Configurações",
      botSettings: "Configurações do Bot",
      close: "Fechar",
      language: "Idioma",
      themeSettings: "Configurações de Tema",
      themeSettingsDesc: "Escolha seu tema de cores preferido para a interface.",
      languageSelectDesc: "Selecione seu idioma preferido. As alterações terão efeito imediatamente.",
      autoCaptcha: "Resolvedor de CAPTCHA Automático",
      autoCaptchaDesc: "Tenta resolver o CAPTCHA automaticamente simulando a colocação manual de um pixel quando o token expira.",
      applySettings: "Aplicar Configurações",
      settingsSaved: "✅ Configurações salvas com sucesso!",
      cooldownSettings: "Configurações de Cooldown",
      waitCharges: "Aguardar até as cargas atingirem",
      captchaSolving: "🤖 Tentando resolver o CAPTCHA...",
      captchaFailed: "❌ Falha ao resolver CAPTCHA. Pinte um pixel manualmente.",
      automation: "Automação",
      noChargesThreshold: "⌛ Aguardando cargas atingirem {threshold}. Atual: {current}. Próxima em {time}...",
    },
    vi: {
      title: "WPlace Auto-Image",
      scanColors: "Quét màu",
      uploadImage: "Tải lên hình ảnh",
      resizeImage: "Thay đổi kích thước",
      selectPosition: "Chọn vị trí",
      startPainting: "Bắt đầu vẽ",
      stopPainting: "Dừng vẽ",
      checkingColors: "🔍 Đang kiểm tra màu sắc có sẵn...",
      noColorsFound: "❌ Hãy mở bảng màu trên trang web và thử lại!",
      colorsFound: "✅ Tìm thấy {count} màu. Sẵn sàng để tải lên.",
      loadingImage: "🖼️ Đang tải hình ảnh...",
      imageLoaded: "✅ Đã tải hình ảnh với {count} pixel hợp lệ",
      imageError: "❌ Lỗi khi tải hình ảnh",
      selectPositionAlert: "Vẽ pixel đầu tiên tại vị trí bạn muốn tác phẩm nghệ thuật bắt đầu!",
      waitingPosition: "👆 Đang chờ bạn vẽ pixel tham chiếu...",
      positionSet: "✅ Đã đặt vị trí thành công!",
      positionTimeout: "❌ Hết thời gian chọn vị trí",
      startPaintingMsg: "🎨 Bắt đầu vẽ...",
      paintingProgress: "🧱 Tiến trình: {painted}/{total} pixel...",
      noCharges: "⌛ Không có điện tích. Đang chờ {time}...",
      paintingStopped: "⏹️ Người dùng đã dừng vẽ",
      paintingComplete: "✅ Hoàn thành vẽ! Đã vẽ {count} pixel.",
      paintingError: "❌ Lỗi trong quá trình vẽ",
      missingRequirements: "❌ Hãy tải lên hình ảnh và chọn vị trí trước",
      progress: "Tiến trình",
      pixels: "Pixel",
      charges: "Điện tích",
      estimatedTime: "Thời gian ước tính",
      initMessage: "Nhấp 'Tải lên hình ảnh' để bắt đầu",
      waitingInit: "Đang chờ khởi tạo...",
      initializingToken: "🔧 Đang khởi tạo bộ tạo token Turnstile...",
      tokenReady: "✅ Bộ tạo token đã sẵn sàng - bạn có thể bắt đầu vẽ!",
      tokenRetryLater: "⚠️ Bộ tạo token sẽ thử lại khi cần thiết",
      resizeSuccess: "✅ Đã thay đổi kích thước hình ảnh thành {width}x{height}",
      paintingPaused: "⏸️ Tạm dừng vẽ tại vị trí X: {x}, Y: {y}",
      captchaNeeded: "❗ Tạo token thất bại. Vui lòng thử lại sau.",
      saveData: "Lưu tiến trình",
      loadData: "Tải tiến trình",
      saveToFile: "Lưu vào tệp",
      loadFromFile: "Tải từ tệp",
      dataManager: "Dữ liệu",
      autoSaved: "✅ Đã tự động lưu tiến trình",
      dataLoaded: "✅ Đã tải tiến trình thành công",
      fileSaved: "✅ Đã lưu vào tệp thành công",
      fileLoaded: "✅ Đã tải từ tệp thành công",
      noSavedData: "❌ Không tìm thấy tiến trình đã lưu",
      savedDataFound: "✅ Tìm thấy tiến trình đã lưu! Tải để tiếp tục?",
      savedDate: "Đã lưu vào: {date}",
      clickLoadToContinue: "Nhấp 'Tải tiến trình' để tiếp tục.",
      fileError: "❌ Lỗi khi xử lý tệp",
      invalidFileFormat: "❌ Định dạng tệp không hợp lệ",
      paintingSpeed: "Tốc độ vẽ",
      pixelsPerSecond: "pixel/giây",
      speedSetting: "Tốc độ: {speed} pixel/giây",
      settings: "Cài đặt",
      botSettings: "Cài đặt Bot",
      close: "Đóng",
      language: "Ngôn ngữ",
      themeSettings: "Cài đặt Giao diện",
      themeSettingsDesc: "Chọn chủ đề màu sắc yêu thích cho giao diện.",
      languageSelectDesc: "Chọn ngôn ngữ ưa thích. Thay đổi sẽ có hiệu lực ngay lập tức.",
      autoCaptcha: "Tự động giải CAPTCHA",
      autoCaptchaDesc: "Tự động cố gắng giải CAPTCHA bằng cách mô phỏng việc đặt pixel thủ công khi token hết hạn.",
      applySettings: "Áp dụng cài đặt",
      settingsSaved: "✅ Đã lưu cài đặt thành công!",
      cooldownSettings: "Cài đặt thời gian chờ",
      waitCharges: "Chờ cho đến khi số lần sạc đạt",
      captchaSolving: "🤖 Đang cố gắng giải CAPTCHA...",
      captchaFailed: "❌ Giải CAPTCHA tự động thất bại. Vui lòng vẽ một pixel thủ công.",
      automation: "Tự động hóa",
      noChargesThreshold: "⌛ Đang chờ số lần sạc đạt {threshold}. Hiện tại {current}. Lần tiếp theo trong {time}...",
    },
    fr: {
      title: "WPlace Auto-Image",
      scanColors: "Scanner les couleurs",
      uploadImage: "Télécharger l'image",
      resizeImage: "Redimensionner l'image",
      selectPosition: "Sélectionner la position",
      startPainting: "Commencer à peindre",
      stopPainting: "Arrêter de peindre",
      checkingColors: "🔍 Vérification des couleurs disponibles...",
      noColorsFound: "❌ Ouvrez la palette de couleurs sur le site et réessayez!",
      colorsFound: "✅ {count} couleurs trouvées. Prêt à télécharger.",
      loadingImage: "🖼️ Chargement de l'image...",
      imageLoaded: "✅ Image chargée avec {count} pixels valides",
      imageError: "❌ Erreur lors du chargement de l'image",
      selectPositionAlert: "Peignez le premier pixel à l'endroit où vous voulez que l'art commence!",
      waitingPosition: "👆 En attente que vous peigniez le pixel de référence...",
      positionSet: "✅ Position définie avec succès!",
      positionTimeout: "❌ Délai d'attente pour la sélection de position",
      startPaintingMsg: "🎨 Début de la peinture...",
      paintingProgress: "🧱 Progrès: {painted}/{total} pixels...",
      noCharges: "⌛ Aucune charge. En attente {time}...",
      paintingStopped: "⏹️ Peinture arrêtée par l'utilisateur",
      paintingComplete: "✅ Peinture terminée! {count} pixels peints.",
      paintingError: "❌ Erreur pendant la peinture",
      missingRequirements: "❌ Veuillez charger une image et sélectionner une position d'abord",
      progress: "Progrès",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Temps estimé",
      initMessage: "Cliquez sur 'Télécharger l'image' pour commencer",
      waitingInit: "En attente d'initialisation...",
      initializingToken: "🔧 Initialisation du générateur de tokens Turnstile...",
      tokenReady: "✅ Générateur de tokens prêt - vous pouvez commencer à peindre!",
      tokenRetryLater: "⚠️ Le générateur de tokens réessaiera si nécessaire",
      resizeSuccess: "✅ Image redimensionnée en {width}x{height}",
      paintingPaused: "⏸️ Peinture en pause à la position X: {x}, Y: {y}",
      captchaNeeded: "❗ Échec de la génération de token. Veuillez réessayer dans un moment.",
      saveData: "Sauvegarder le progrès",
      loadData: "Charger le progrès",
      saveToFile: "Sauvegarder dans un fichier",
      loadFromFile: "Charger depuis un fichier",
      dataManager: "Données",
      autoSaved: "✅ Progrès sauvegardé automatiquement",
      dataLoaded: "✅ Progrès chargé avec succès",
      fileSaved: "✅ Sauvegardé dans un fichier avec succès",
      fileLoaded: "✅ Chargé depuis un fichier avec succès",
      noSavedData: "❌ Aucun progrès sauvegardé trouvé",
      savedDataFound: "✅ Progrès sauvegardé trouvé! Charger pour continuer?",
      savedDate: "Sauvegardé le: {date}",
      clickLoadToContinue: "Cliquez sur 'Charger le progrès' pour continuer.",
      fileError: "❌ Erreur lors du traitement du fichier",
      invalidFileFormat: "❌ Format de fichier invalide",
      paintingSpeed: "Vitesse de peinture",
      pixelsPerSecond: "pixels/seconde",
      speedSetting: "Vitesse: {speed} pixels/sec",
      settings: "Paramètres",
      botSettings: "Paramètres du Bot",
      close: "Fermer",
      language: "Langue",
      themeSettings: "Paramètres de Thème",
      themeSettingsDesc: "Choisissez votre thème de couleurs préféré pour l'interface.",
      languageSelectDesc: "Sélectionnez votre langue préférée. Les changements prendront effet immédiatement.",
      autoCaptcha: "Résolveur de CAPTCHA automatique",
      autoCaptchaDesc: "Tente automatiquement de résoudre le CAPTCHA en simulant un placement manuel de pixel lorsque le jeton expire.",
      applySettings: "Appliquer les paramètres",
      settingsSaved: "✅ Paramètres enregistrés avec succès !",
      cooldownSettings: "Paramètres de recharge",
      waitCharges: "Attendre que les charges atteignent",
      captchaSolving: "🤖 Tentative de résolution du CAPTCHA...",
      captchaFailed: "❌ Échec de l'Auto-CAPTCHA. Peignez un pixel manuellement.",
      automation: "Automatisation",
      noChargesThreshold: "⌛ En attente que les charges atteignent {threshold}. Actuel: {current}. Prochaine dans {time}...",
    },
    id: {
      title: "WPlace Auto-Image",
      scanColors: "Pindai Warna",
      uploadImage: "Unggah Gambar",
      resizeImage: "Ubah Ukuran Gambar",
      selectPosition: "Pilih Posisi",
      startPainting: "Mulai Melukis",
      stopPainting: "Berhenti Melukis",
      checkingColors: "🔍 Memeriksa warna yang tersedia...",
      noColorsFound: "❌ Buka palet warna di situs dan coba lagi!",
      colorsFound: "✅ {count} warna ditemukan. Siap untuk diunggah.",
      loadingImage: "🖼️ Memuat gambar...",
      imageLoaded: "✅ Gambar dimuat dengan {count} piksel valid",
      imageError: "❌ Kesalahan saat memuat gambar",
      selectPositionAlert: "Lukis piksel pertama di lokasi tempat karya seni akan dimulai!",
      waitingPosition: "👆 Menunggu Anda melukis piksel referensi...",
      positionSet: "✅ Posisi berhasil diatur!",
      positionTimeout: "❌ Waktu habis untuk memilih posisi",
      startPaintingMsg: "🎨 Mulai melukis...",
      paintingProgress: "🧱 Progres: {painted}/{total} piksel...",
      noCharges: "⌛ Tidak ada muatan. Menunggu {time}...",
      paintingStopped: "⏹️ Lukisan dihentikan oleh pengguna",
      paintingComplete: "✅ Lukisan selesai! {count} piksel dilukis.",
      paintingError: "❌ Kesalahan selama melukis",
      missingRequirements: "❌ Muat gambar dan pilih posisi terlebih dahulu",
      progress: "Progres",
      pixels: "Piksel",
      charges: "Muatan",
      estimatedTime: "Waktu perkiraan",
      initMessage: "Klik 'Unggah Gambar' untuk memulai",
      waitingInit: "Menunggu inisialisasi...",
      initializingToken: "🔧 Menginisialisasi generator token Turnstile...",
      tokenReady: "✅ Generator token siap - Anda sekarang dapat mulai melukis!",
      tokenRetryLater: "⚠️ Generator token akan mencoba lagi saat dibutuhkan",
      resizeSuccess: "✅ Gambar diubah ukurannya menjadi {width}x{height}",
      paintingPaused: "⏸️ Lukisan dijeda pada posisi X: {x}, Y: {y}",
      captchaNeeded: "❗ Pembuatan token gagal. Silakan coba lagi sebentar.",
      saveData: "Simpan Progres",
      loadData: "Muat Progres",
      saveToFile: "Simpan ke File",
      loadFromFile: "Muat dari File",
      dataManager: "Manajer Data",
      autoSaved: "✅ Progres disimpan secara otomatis",
      dataLoaded: "✅ Progres berhasil dimuat",
      fileSaved: "✅ Progres berhasil disimpan ke file",
      fileLoaded: "✅ Progres berhasil dimuat dari file",
      noSavedData: "❌ Tidak ada progres yang disimpan ditemukan",
      savedDataFound: "✅ Progres yang disimpan ditemukan! Muat untuk melanjutkan?",
      savedDate: "Disimpan pada: {date}",
      clickLoadToContinue: "Klik 'Muat Progres' untuk melanjutkan.",
      fileError: "❌ Kesalahan saat memproses file",
      invalidFileFormat: "❌ Format file tidak valid",
      paintingSpeed: "Kecepatan Melukis",
      pixelsPerSecond: "piksel/detik",
      speedSetting: "Kecepatan: {speed} piksel/dtk",
      settings: "Pengaturan",
      botSettings: "Pengaturan Bot",
      close: "Tutup",
      language: "Bahasa",
      themeSettings: "Pengaturan Tema",
      themeSettingsDesc: "Pilih tema warna pilihan Anda untuk antarmuka.",
      languageSelectDesc: "Pilih bahasa pilihan Anda. Perubahan akan segera berlaku.",
      autoCaptcha: "Pemecah CAPTCHA Otomatis",
      autoCaptchaDesc: "Mencoba memecahkan CAPTCHA secara otomatis dengan mensimulasikan penempatan piksel manual saat token kedaluwarsa.",
      applySettings: "Terapkan Pengaturan",
      settingsSaved: "✅ Pengaturan berhasil disimpan!",
      cooldownSettings: "Pengaturan Cooldown",
      waitCharges: "Tunggu sampai muatan mencapai",
      captchaSolving: "🤖 Mencoba memecahkan CAPTCHA...",
      captchaFailed: "❌ Auto-CAPTCHA gagal. Lukis satu piksel secara manual.",
      automation: "Otomasi",
      noChargesThreshold: "⌛ Menunggu muatan mencapai {threshold}. Saat ini {current}. Berikutnya dalam {time}...",
    },
    de: {
      title: "WPlace Auto-Image",
      scanColors: "Farben scannen",
      uploadImage: "Bild hochladen",
      resizeImage: "Bildgröße ändern",
      selectPosition: "Position auswählen",
      startPainting: "Malen starten",
      stopPainting: "Malen stoppen",
      checkingColors: "🔍 Verfügbare Farben werden überprüft...",
      noColorsFound: "❌ Öffne die Farbpalette auf der Seite und versuche es erneut!",
      colorsFound: "✅ {count} Farben gefunden. Bereit zum Hochladen.",
      loadingImage: "🖼️ Bild wird geladen...",
      imageLoaded: "✅ Bild mit {count} gültigen Pixeln geladen",
      imageError: "❌ Fehler beim Laden des Bildes",
      selectPositionAlert: "Male den ersten Pixel an der Stelle, an der die Kunst beginnen soll!",
      waitingPosition: "👆 Warte darauf, dass du den Referenzpixel malst...",
      positionSet: "✅ Position erfolgreich gesetzt!",
      positionTimeout: "❌ Zeitüberschreitung bei der Positionsauswahl",
      startPaintingMsg: "🎨 Malen wird gestartet...",
      paintingProgress: "🧱 Fortschritt: {painted}/{total} Pixel...",
      noCharges: "⌛ Keine Ladungen. Warte {time}...",
      paintingStopped: "⏹️ Malen vom Benutzer gestoppt",
      paintingComplete: "✅ Malen abgeschlossen! {count} Pixel gemalt.",
      paintingError: "❌ Fehler beim Malen",
      missingRequirements: "❌ Zuerst ein Bild laden und eine Position auswählen",
      progress: "Fortschritt",
      pixels: "Pixel",
      charges: "Ladungen",
      estimatedTime: "Geschätzte Zeit",
      initMessage: "Klicke auf 'Bild hochladen', um zu beginnen",
      waitingInit: "Warte auf Initialisierung...",
      initializingToken: "🔧 Initialisiere Turnstile-Token-Generator...",
      tokenReady: "✅ Token-Generator ist bereit - du kannst jetzt mit dem Malen beginnen!",
      tokenRetryLater: "⚠️ Token-Generator wird bei Bedarf erneut versuchen",
      resizeSuccess: "✅ Bild auf {width}x{height} geändert",
      paintingPaused: "⏸️ Malen an Position X: {x}, Y: {y} pausiert",
      captchaNeeded: "❗ Token-Generierung fehlgeschlagen. Bitte versuche es in einem Moment erneut.",
      saveData: "Fortschritt speichern",
      loadData: "Fortschritt laden",
      saveToFile: "In Datei speichern",
      loadFromFile: "Aus Datei laden",
      dataManager: "Datenmanager",
      autoSaved: "✅ Fortschritt automatisch gespeichert",
      dataLoaded: "✅ Fortschritt erfolgreich geladen",
      fileSaved: "✅ Fortschritt erfolgreich in Datei gespeichert",
      fileLoaded: "✅ Fortschritt erfolgreich aus Datei geladen",
      noSavedData: "❌ Kein gespeicherter Fortschritt gefunden",
      savedDataFound: "✅ Gespeicherter Fortschritt gefunden! Laden, um fortzufahren?",
      savedDate: "Gespeichert am: {date}",
      clickLoadToContinue: "Klicke auf 'Fortschritt laden', um fortzufahren.",
      fileError: "❌ Fehler beim Verarbeiten der Datei",
      invalidFileFormat: "❌ Ungültiges Dateiformat",
      paintingSpeed: "Malgeschwindigkeit",
      pixelsPerSecond: "Pixel/Sekunde",
      speedSetting: "Geschwindigkeit: {speed} Pixel/Sek",
      settings: "Einstellungen",
      botSettings: "Bot-Einstellungen",
      close: "Schließen",
      language: "Sprache",
      themeSettings: "Theme-Einstellungen",
      themeSettingsDesc: "Wähle dein bevorzugtes Farbthema für die Benutzeroberfläche.",
      languageSelectDesc: "Wähle deine bevorzugte Sprache. Änderungen werden sofort wirksam.",
      autoCaptcha: "Auto-CAPTCHA-Löser",
      autoCaptchaDesc: "Versucht automatisch, das CAPTCHA zu lösen, indem die manuelle Pixelplatzierung simuliert wird, wenn das Token abläuft.",
      applySettings: "Einstellungen anwenden",
      settingsSaved: "✅ Einstellungen erfolgreich gespeichert!",
      cooldownSettings: "Cooldown-Einstellungen",
      waitCharges: "Warten, bis Ladungen erreicht sind",
      captchaSolving: "🤖 Versuche, CAPTCHA zu lösen...",
      captchaFailed: "❌ Auto-CAPTCHA fehlgeschlagen. Male einen Pixel manuell.",
      automation: "Automatisierung",
      noChargesThreshold: "⌛ Warte auf Ladungen, um {threshold} zu erreichen. Aktuell: {current}. Nächste in {time}...",
    },
    es: {
      title: "WPlace Auto-Image",
      scanColors: "Escanear Colores",
      uploadImage: "Subir Imagen",
      resizeImage: "Redimensionar Imagen",
      selectPosition: "Seleccionar Posición",
      startPainting: "Comenzar a Pintar",
      stopPainting: "Detener Pintura",
      checkingColors: "🔍 Verificando colores disponibles...",
      noColorsFound: "❌ ¡Abre la paleta de colores en el sitio e intenta de nuevo!",
      colorsFound: "✅ {count} colores disponibles encontrados. Listo para subir.",
      loadingImage: "🖼️ Cargando imagen...",
      imageLoaded: "✅ Imagen cargada con {count} píxeles válidos",
      imageError: "❌ Error al cargar la imagen",
      selectPositionAlert: "¡Pinta el primer píxel en la ubicación donde quieres que comience el arte!",
      waitingPosition: "👆 Esperando que pintes el píxel de referencia...",
      positionSet: "✅ ¡Posición establecida con éxito!",
      positionTimeout: "❌ Tiempo de espera para la selección de posición agotado",
      startPaintingMsg: "🎨 Comenzando a pintar...",
      paintingProgress: "🧱 Progreso: {painted}/{total} píxeles...",
      noCharges: "⌛ Sin cargas. Esperando {time}...",
      paintingStopped: "⏹️ Pintura detenida por el usuario",
      paintingComplete: "✅ ¡Pintura completa! {count} píxeles pintados.",
      paintingError: "❌ Error durante la pintura",
      missingRequirements: "❌ Carga una imagen y selecciona una posición primero",
      progress: "Progreso",
      pixels: "Píxeles",
      charges: "Cargas",
      estimatedTime: "Tiempo estimado",
      initMessage: "Haz clic en 'Subir Imagen' para comenzar",
      waitingInit: "Esperando inicialización...",
      initializingToken: "🔧 Inicializando generador de tokens Turnstile...",
      tokenReady: "✅ ¡Generador de tokens listo - ahora puedes empezar a pintar!",
      tokenRetryLater: "⚠️ El generador de tokens volverá a intentarlo cuando sea necesario",
      resizeSuccess: "✅ Imagen redimensionada a {width}x{height}",
      paintingPaused: "⏸️ Pintura pausada en la posición X: {x}, Y: {y}",
      captchaNeeded: "❗ La generación de token falló. Por favor, inténtalo de nuevo en un momento.",
      saveData: "Guardar Progreso",
      loadData: "Cargar Progreso",
      saveToFile: "Guardar en Archivo",
      loadFromFile: "Cargar desde Archivo",
      dataManager: "Gestor de Datos",
      autoSaved: "✅ Progreso guardado automáticamente",
      dataLoaded: "✅ Progreso cargado con éxito",
      fileSaved: "✅ Progreso guardado en archivo con éxito",
      fileLoaded: "✅ Progreso cargado desde archivo con éxito",
      noSavedData: "❌ No se encontró progreso guardado",
      savedDataFound: "✅ ¡Progreso guardado encontrado! ¿Cargar para continuar?",
      savedDate: "Guardado el: {date}",
      clickLoadToContinue: "Haz clic en 'Cargar Progreso' para continuar.",
      fileError: "❌ Error al procesar el archivo",
      invalidFileFormat: "❌ Formato de archivo inválido",
      paintingSpeed: "Velocidad de Pintura",
      pixelsPerSecond: "píxeles/segundo",
      speedSetting: "Velocidad: {speed} píxeles/seg",
      settings: "Configuración",
      botSettings: "Configuración del Bot",
      close: "Cerrar",
      language: "Idioma",
      themeSettings: "Configuración del Tema",
      themeSettingsDesc: "Elige tu tema de color preferido para la interfaz.",
      languageSelectDesc: "Selecciona tu idioma preferido. Los cambios se aplicarán de inmediato.",
      autoCaptcha: "Solucionador de CAPTCHA automático",
      autoCaptchaDesc: "Intenta resolver el CAPTCHA automáticamente simulando la colocación manual de un píxel cuando el token expira.",
      applySettings: "Aplicar Configuración",
      settingsSaved: "✅ ¡Configuración guardada con éxito!",
      cooldownSettings: "Configuración de Cooldown",
      waitCharges: "Esperar hasta que las cargas alcancen",
      captchaSolving: "🤖 Intentando resolver el CAPTCHA...",
      captchaFailed: "❌ Auto-CAPTCHA falló. Pinta un píxel manualmente.",
      automation: "Automatización",
      noChargesThreshold: "⌛ Esperando a que las cargas alcancen {threshold}. Actualmente {current}. Siguiente en {time}...",
    },
    pl: {
      title: "WPlace Auto-Image",
      scanColors: "Skanuj kolory",
      uploadImage: "Prześlij obraz",
      resizeImage: "Zmień rozmiar obrazu",
      selectPosition: "Wybierz pozycję",
      startPainting: "Rozpocznij malowanie",
      stopPainting: "Zatrzymaj malowanie",
      checkingColors: "🔍 Sprawdzam dostępne kolory...",
      noColorsFound: "❌ Otwórz paletę kolorów na stronie i spróbuj ponownie!",
      colorsFound: "✅ Znaleziono {count} dostępnych kolorów. Gotowe do przesłania.",
      loadingImage: "🖼️ Ładowanie obrazu...",
      imageLoaded: "✅ Obraz załadowany z {count} poprawnymi pikselami",
      imageError: "❌ Błąd ładowania obrazu",
      selectPositionAlert: "Pomaluj pierwszy piksel w miejscu, w którym ma się rozpocząć rysunek!",
      waitingPosition: "👆 Czekam na pomalowanie piksela referencyjnego...",
      positionSet: "✅ Pozycja ustawiona pomyślnie!",
      positionTimeout: "❌ Przekroczono czas oczekiwania na wybór pozycji",
      startPaintingMsg: "🎨 Rozpoczynam malowanie...",
      paintingProgress: "🧱 Postęp: {painted}/{total} pikseli...",
      noCharges: "⌛ Brak ładunków. Czekam {time}...",
      paintingStopped: "⏹️ Malowanie zatrzymane przez użytkownika",
      paintingComplete: "✅ Malowanie zakończone! Pomalowano {count} pikseli.",
      paintingError: "❌ Błąd podczas malowania",
      missingRequirements: "❌ Najpierw załaduj obraz i wybierz pozycję",
      progress: "Postęp",
      pixels: "Piksele",
      charges: "Ładunki",
      estimatedTime: "Szacowany czas",
      initMessage: "Kliknij 'Prześlij obraz', aby rozpocząć",
      waitingInit: "Oczekiwanie na inicjalizację...",
      initializingToken: "🔧 Inicjuję generator tokenów Turnstile...",
      tokenReady: "✅ Generator tokenów gotowy - możesz zacząć malować!",
      tokenRetryLater: "⚠️ Generator tokenów ponowi próbę w razie potrzeby",
      resizeSuccess: "✅ Obraz zmieniono na {width}x{height}",
      paintingPaused: "⏸️ Malowanie wstrzymane na pozycji X: {x}, Y: {y}",
      captchaNeeded: "❗ Generowanie tokenu nie powiodło się. Spróbuj ponownie za chwilę.",
      saveData: "Zapisz postęp",
      loadData: "Wczytaj postęp",
      saveToFile: "Zapisz do pliku",
      loadFromFile: "Wczytaj z pliku",
      dataManager: "Menedżer danych",
      autoSaved: "✅ Postęp zapisany automatycznie",
      dataLoaded: "✅ Postęp pomyślnie wczytany",
      fileSaved: "✅ Postęp pomyślnie zapisany do pliku",
      fileLoaded: "✅ Postęp pomyślnie wczytany z pliku",
      noSavedData: "❌ Nie znaleziono zapisanego postępu",
      savedDataFound: "✅ Znaleziono zapisany postęp! Wczytać, aby kontynuować?",
      savedDate: "Zapisano: {date}",
      clickLoadToContinue: "Kliknij 'Wczytaj postęp', aby kontynuować.",
      fileError: "❌ Błąd podczas przetwarzania pliku",
      invalidFileFormat: "❌ Nieprawidłowy format pliku",
      paintingSpeed: "Szybkość malowania",
      pixelsPerSecond: "pikseli/sekundę",
      speedSetting: "Szybkość: {speed} pikseli/sek",
      settings: "Ustawienia",
      botSettings: "Ustawienia bota",
      close: "Zamknij",
      language: "Język",
      themeSettings: "Ustawienia motywu",
      themeSettingsDesc: "Wybierz preferowany motyw kolorystyczny interfejsu.",
      languageSelectDesc: "Wybierz preferowany język. Zmiany wejdą w życie natychmiast.",
      autoCaptcha: "Automatyczny rozwiązujący CAPTCHA",
      autoCaptchaDesc: "Automatycznie próbuje rozwiązać CAPTCHA, symulując ręczne umieszczanie piksela po wygaśnięciu tokena.",
      applySettings: "Zastosuj ustawienia",
      settingsSaved: "✅ Ustawienia zapisane pomyślnie!",
      cooldownSettings: "Ustawienia odnowienia",
      waitCharges: "Czekaj, aż osiągniesz ładunki",
      captchaSolving: "🤖 Próbuję rozwiązać CAPTCHA...",
      captchaFailed: "❌ Auto-CAPTCHA nie powiodło się. Pomaluj jeden piksel ręcznie.",
      automation: "Automatyzacja",
      noChargesThreshold: "⌛ Czekam na ładunki, aż osiągną {threshold}. Obecnie {current}. Następne za {time}...",
    },
  }

  const state = {
    // --- Internal State (runtime) ---
    // Bot operation
    isPainting: false,
    isInitializing: true,
    paintingTimeoutId: null,
    // Pixel and image data
    imageData: null, // Holds the processed image data from user upload
    paintedMap: null, // A 2D array or similar structure to track painted pixels
    totalPixels: 0,
    paintedPixels: 0,
    // Cooldown and charges
    nextAvailablePixelTime: 0,
    charges: 0,
    maxCharges: 1, // Will be updated on init
    // Positioning
    startPosition: null, // The user-defined top-left corner
    lastPosition: null, // The last pixel painted
    // Colors
    availableColors: null, // Map of site's available colors
    colorsChecked: false,
    // Other UI state
    isDragging: false,
    isPanning: false,
    selectingPosition: false,
    minimized: false,
    isStatsWindowOpen: false,
    isSettingsWindowOpen: false,
    compactMode: false,
    // Data Management
    _lastSaveTime: 0,
    _lastSavePixelCount: 0,
    // Bot settings (persisted)
    paintingSpeed: CONFIG.PAINTING_SPEED.DEFAULT,
    paintingSpeedEnabled: CONFIG.PAINTING_SPEED_ENABLED,
    batchMode: CONFIG.BATCH_MODE,
    randomBatchMin: CONFIG.RANDOM_BATCH_RANGE.MIN,
    randomBatchMax: CONFIG.RANDOM_BATCH_RANGE.MAX,
    cooldownChargeThreshold: CONFIG.COOLDOWN_CHARGE_THRESHOLD,
    tokenSource: CONFIG.TOKEN_SOURCE,
    overlayOpacity: CONFIG.OVERLAY.OPACITY_DEFAULT,
    blueMarbleEnabled: CONFIG.OVERLAY.BLUE_MARBLE_DEFAULT,
    ditheringEnabled: CONFIG.OVERLAY.ditheringEnabled,
    // Color matching settings (new)
    colorMatchingAlgorithm: "lab",
    enableChromaPenalty: true,
    chromaPenaltyWeight: 0.15,
    customTransparencyThreshold: CONFIG.TRANSPARENCY_THRESHOLD,
    customWhiteThreshold: CONFIG.WHITE_THRESHOLD,
    paintWhitePixels: true, // New setting: paint white pixels
    // Resize settings (new)
    resizeSettings: null, // { width: Number, height: Number, ignoreTransparent: Boolean, customScale: Number, lockRatio: Boolean }
    originalImage: null, // Store the original image blob/data URL
    resizeIgnoreMask: null,
    // Notifications
    notificationsEnabled: CONFIG.NOTIFICATIONS.ENABLED,
    notifyOnChargesReached: CONFIG.NOTIFICATIONS.ON_CHARGES_REACHED,
    notifyOnlyWhenUnfocused: CONFIG.NOTIFICATIONS.ONLY_WHEN_UNFOCUSED,
    notificationIntervalMinutes: CONFIG.NOTIFICATIONS.REPEAT_MINUTES,
    lastNotificationTime: 0,
    // Language
    language: "en",
    // Token
    turnstileToken: null,
    lastTokenTime: 0,
    lastManualPixelTime: 0,
    reinitRequired: false,
  }

  // --- Helper Functions and Utilities ---
  const Utils = {
    // Internationalization (i18n)
    t: (key, args) => {
      let text = TEXT[state.language][key] || TEXT.en[key] || key;
      if (args) {
        for (const [k, v] of Object.entries(args)) {
          text = text.replace(new RegExp(`{${k}}`, 'g'), v);
        }
      }
      return text;
    },
    // DOM & UI
    createElement: (tag, attributes = {}, ...children) => {
      const el = document.createElement(tag);
      for (const [key, value] of Object.entries(attributes)) {
        if (key.startsWith('on') && typeof value === 'function') {
          el.addEventListener(key.slice(2).toLowerCase(), value);
        } else if (key === 'style' && typeof value === 'object') {
          Object.assign(el.style, value);
        } else if (key === 'class' && Array.isArray(value)) {
          el.classList.add(...value);
        } else if (key === 'class') {
          el.className = value;
        } else if (key === 'dataset') {
          Object.assign(el.dataset, value);
        } else {
          el.setAttribute(key, value);
        }
      }
      for (const child of children) {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else {
          el.appendChild(child);
        }
      }
      return el;
    },
    debounce: (func, wait) => {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },
    throttle: (func, limit) => {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },
    showAlert: (message, type = "info", duration = 3000) => {
      const container = document.getElementById("wplace-image-bot-container")
      if (!container) return

      const alert = document.createElement("div")
      alert.className = `wplace-alert wplace-alert-${type}`
      alert.textContent = message
      container.appendChild(alert)

      setTimeout(() => {
        alert.classList.add("fade-out")
        setTimeout(() => alert.remove(), 500)
      }, duration)
    },
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    // Time & Date
    formatTime: (ms) => {
      const s = Math.floor(ms / 1000);
      const m = Math.floor(s / 60);
      const h = Math.floor(m / 60);
      const remainingS = s % 60;
      const remainingM = m % 60;
      let timeString = `${remainingS}s`;
      if (m > 0) timeString = `${remainingM}m ` + timeString;
      if (h > 0) timeString = `${h}h ` + timeString;
      return timeString;
    },
    formatDate: (timestamp) => {
      const d = new Date(timestamp);
      return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    },
    // File & Data
    saveDataToFile: (data, filename) => {
      try {
        const blob = new Blob([JSON.stringify(data)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        return true
      } catch (error) {
        console.error("Error saving data to file:", error)
        return false
      }
    },
    loadDataFromFile: () => {
      return new Promise((resolve, reject) => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "application/json"
        input.onchange = (e) => {
          const file = e.target.files[0]
          if (!file) {
            reject(new Error(Utils.t("fileError")))
            return
          }
          const reader = new FileReader()
          reader.onload = (event) => {
            try {
              const data = JSON.parse(event.target.result)
              resolve(data)
            } catch (error) {
              reject(new Error(Utils.t("invalidFileFormat")))
            }
          }
          reader.onerror = () => {
            reject(new Error(Utils.t("fileError")))
          }
          reader.readAsText(file)
        }
        input.click()
      })
    },
    packPaintedMapToBase64: (paintedMap, width, height) => {
      const buffer = new Uint8ClampedArray(Math.ceil(width * height / 8));
      let byteIndex = 0;
      let bitIndex = 0;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (paintedMap[y][x]) {
            buffer[byteIndex] |= (1 << (7 - bitIndex));
          }
          bitIndex++;
          if (bitIndex === 8) {
            bitIndex = 0;
            byteIndex++;
          }
        }
      }
      return btoa(String.fromCharCode(...buffer));
    },
    unpackPaintedMapFromBase64: (packedData, width, height) => {
      const binaryString = atob(packedData);
      const paintedMap = new Array(height).fill(null).map(() => new Array(width).fill(false));
      let byteIndex = 0;
      let bitIndex = 0;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const byte = binaryString.charCodeAt(byteIndex);
          if ((byte >> (7 - bitIndex)) & 1) {
            paintedMap[y][x] = true;
          }
          bitIndex++;
          if (bitIndex === 8) {
            bitIndex = 0;
            byteIndex++;
          }
        }
      }
      return paintedMap;
    },
    migrateProgressToV2: (saved) => {
      if (!saved) return saved;
      const isV1 = !saved.version || saved.version === '1' || saved.version === '1.0' || saved.version === '1.1';
      if (!isV1) return saved;
      try {
        const migrated = { ...saved };
        const width = migrated.imageData?.width;
        const height = migrated.imageData?.height;
        if (migrated.paintedMap && width && height) {
          const data = Utils.packPaintedMapToBase64(migrated.paintedMap, width, height);
          migrated.paintedMapPacked = {
            width,
            height,
            data
          };
        }
        delete migrated.paintedMap;
        migrated.version = '2';
        return migrated;
      } catch (e) {
        console.warn('Migration to v2 failed, using original data:', e);
        return saved;
      }
    },
    migrateProgressToV21: (saved) => {
      if (!saved) return saved;
      if (saved.version === '2.1') return saved;
      const isV2 = saved.version === '2' || saved.version === '2.0';
      const isV1 = !saved.version || saved.version === '1' || saved.version === '1.0' || saved.version === '1.1';
      if (!isV2 && !isV1) return saved; // save this for future
      try {
        const migrated = { ...saved };
        // First migrate to v2 if needed
        if (isV1) {
          const width = migrated.imageData?.width;
          const height = migrated.imageData?.height;
          if (migrated.paintedMap && width && height) {
            const data = Utils.packPaintedMapToBase64(migrated.paintedMap, width, height);
            migrated.paintedMapPacked = {
              width,
              height,
              data
            };
          }
          delete migrated.paintedMap;
        }
        migrated.version = '2.1';
        return migrated;
      } catch (e) {
        console.warn('Migration to v2.1 failed, using original data:', e);
        return saved;
      }
    },
    saveProgress: () => {
      try {
        // Pack painted map if available
        let paintedMapPacked = null;
        if (state.paintedMap && state.imageData) {
          const data = Utils.packPaintedMapToBase64(state.paintedMap, state.imageData.width, state.imageData.height);
          if (data) {
            paintedMapPacked = {
              width: state.imageData.width,
              height: state.imageData.height,
              data: data
            };
          }
        }
        const progressData = {
          timestamp: Date.now(),
          version: "2.1",
          state: {
            totalPixels: state.totalPixels,
            paintedPixels: state.paintedPixels,
            lastPosition: state.lastPosition,
            startPosition: state.startPosition,
            region: state.region,
            imageLoaded: state.imageLoaded,
            colorsChecked: state.colorsChecked,
            availableColors: state.availableColors,
          },
          imageData: state.imageData ? {
            width: state.imageData.width,
            height: state.imageData.height,
            pixels: Array.from(state.imageData.pixels),
            totalPixels: state.imageData.totalPixels,
          } : null,
          paintedMapPacked: paintedMapPacked,
        }
        localStorage.setItem("wplace-bot-progress", JSON.stringify(progressData))
        return true
      } catch (error) {
        console.error("Error saving progress:", error)
        return false
      }
    },
    loadProgress: () => {
      try {
        const saved = localStorage.getItem("wplace-bot-progress")
        if (!saved) return null;
        let data = JSON.parse(saved);
        const ver = data.version;
        let migrated = data;
        if (ver === '2.1') { // already latest
        } else if (ver === '2' || ver === '2.0') {
          migrated = Utils.migrateProgressToV21(data);
        } else {
          migrated = Utils.migrateProgressToV21(data);
        }
        if (migrated && migrated !== data) {
          try {
            localStorage.setItem("wplace-bot-progress", JSON.stringify(migrated));
          } catch {}
          data = migrated;
        }
        return data;
      } catch (error) {
        console.error("Error loading progress:", error)
        return null
      }
    },
    clearProgress: () => {
      try {
        localStorage.removeItem("wplace-bot-progress")
        // Also clear painted map from memory
        state.paintedMap = null;
        state._lastSavePixelCount = 0;
        state._lastSaveTime = 0;
        console.log("📋 Progress and painted map cleared");
        return true
      } catch (error) {
        console.error("Error clearing progress:", error)
        return false
      }
    },
    restoreProgress: (savedData) => {
      try {
        Object.assign(state, savedData.state)
        if (savedData.imageData) {
          state.imageData = {
            ...savedData.imageData,
            pixels: new Uint8ClampedArray(savedData.imageData.pixels),
          }
          try {
            const canvas = document.createElement('canvas');
            canvas.width = state.imageData.width;
            canvas.height = state.imageData.height;
            const ctx = canvas.getContext('2d');
            const imageData = new ImageData(state.imageData.pixels, state.imageData.width, state.imageData.height);
            ctx.putImageData(imageData, 0, 0);
            const proc = new ImageProcessor('');
            proc.img = canvas;
            proc.canvas = canvas;
            proc.ctx = ctx;
            state.imageData.processor = proc;
          } catch (e) {
            console.warn('Could not rebuild processor from saved image data:', e);
          }
        }
        // Prefer packed form if available; fallback to legacy paintedMap array for backward compatibility
        if (savedData.paintedMapPacked && savedData.paintedMapPacked.data) {
          const {
            width,
            height,
            data
          } = savedData.paintedMapPacked;
          state.paintedMap = Utils.unpackPaintedMapFromBase64(data, width, height);
        } else if (savedData.paintedMap) {
          state.paintedMap = savedData.paintedMap.map((row) => Array.from(row))
        }
        return true
      } catch (error) {
        console.error("Error restoring progress:", error)
        return false
      }
    },
    // Coordinate & Mapping
    mapClientToPixel: (clientX, clientY) => {
      const rect = document.getElementById("wplace-canvas").getBoundingClientRect();
      const scaleX = rect.width / document.getElementById("wplace-canvas").width;
      const scaleY = rect.height / document.getElementById("wplace-canvas").height;
      const x = Math.floor((clientX - rect.left) / scaleX);
      const y = Math.floor((clientY - rect.top) / scaleY);
      return {
        x,
        y
      };
    },
    // Requests
    getCharges: async () => {
      try {
        const res = await fetch("https://backend.wplace.live/s0/cooldown", {
          method: "GET",
          headers: {
            "Content-Type": "text/plain;charset=UTF-8"
          },
          credentials: "include"
        })
        const data = await res.json()
        const now = Date.now()
        // API returns a single cooldown timestamp
        if (data && data.cooldown) {
          const cooldown = data.cooldown
          state.nextAvailablePixelTime = cooldown
          state.charges = Math.floor(Math.max(0, now - (cooldown - CONFIG.COOLDOWN_DEFAULT)) / CONFIG.COOLDOWN_DEFAULT)
          state.maxCharges = Math.floor(now / CONFIG.COOLDOWN_DEFAULT) // Can't go back in time
          return {
            cooldown,
            charges: state.charges,
            maxCharges: state.maxCharges,
          }
        }
        if (data && data.charges) {
          state.charges = data.charges
          state.maxCharges = data.max_charges
          state.nextAvailablePixelTime = now + (data.cooldown_ms || CONFIG.COOLDOWN_DEFAULT)
          return {
            cooldown: state.nextAvailablePixelTime,
            charges: state.charges,
            maxCharges: state.maxCharges,
          }
        }
        // Fallback for older API versions
        const charges = Math.floor((now - state.lastPixelTime) / CONFIG.COOLDOWN_DEFAULT) + state.charges
        state.charges = Math.min(charges, state.maxCharges)
        return {
          charges: state.charges,
          maxCharges: state.maxCharges
        }

      } catch (e) {
        console.error("Failed to fetch cooldown:", e)
        return {
          cooldown: state.nextAvailablePixelTime,
          charges: state.charges,
          maxCharges: state.maxCharges
        }
      }
    },
    // New endpoint for multiple pixels
    paintPixels: async (pixelBatch) => {
      try {
        const payload = {
          t: state.turnstileToken,
          pixels: pixelBatch.map(p => ({
            x: p.x,
            y: p.y,
            c: p.c
          }))
        }
        const res = await fetch("https://backend.wplace.live/s0/pixel/batch", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=UTF-8"
          },
          credentials: "include",
          body: JSON.stringify(payload),
        })

        if (res.status === 403) {
          // Token expired, need new token
          const errorText = await res.text()
          console.warn("Token expired. Error from server:", errorText)
          turnstileToken = null; // Invalidate token to force a new one
          tokenPromise = new Promise((resolve) => {
            _resolveToken = resolve
          });
          const retryPayload = {
            t: await handleCaptcha(),
            pixels: pixelBatch.map(p => ({
              x: p.x,
              y: p.y,
              c: p.c
            }))
          }
          const retryRes = await fetch("https://backend.wplace.live/s0/pixel/batch", {
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=UTF-8"
            },
            credentials: "include",
            body: JSON.stringify(retryPayload),
          })
          if (retryRes.status === 403) {
            turnstileToken = null;
            tokenPromise = new Promise((resolve) => {
              _resolveToken = resolve
            });
            return "token_error";
          }
          const retryData = await retryRes.json();
          return retryData?.painted === pixelBatch.length;
        }
        const data = await res.json()
        return data?.painted === pixelBatch.length
      } catch (e) {
        console.error("Batch paint request failed:", e)
        return false
      }
    },
    // New function to update a single pixel
    paintPixel: async (x, y, color) => {
      try {
        const payload = {
          t: turnstileToken,
          x,
          y,
          c: color
        }
        const res = await fetch("https://backend.wplace.live/s0/pixel", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=UTF-8"
          },
          credentials: "include",
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (data.status === 'ok') {
          return true
        } else if (data.status === 'error' && data.message === 'cooldown_not_met') {
          const newCooldown = data.cooldown
          console.warn(`Cooldown not met. Server says next pixel is at ${new Date(newCooldown).toLocaleTimeString()}. Waiting...`);
          // Update state with new cooldown
          state.nextAvailablePixelTime = newCooldown;
          state.charges = 0; // Reset charges since we used a pixel
          // update UI to reflect new cooldown
          updateUI("noCharges", "info", {
            time: Utils.formatTime(newCooldown - Date.now())
          });
          return 'cooldown';
        } else if (data.status === 'error' && data.message === 'invalid_captcha_token') {
          console.warn("Invalid CAPTCHA token, attempting to get a new one...");
          turnstileToken = null;
          state.reinitRequired = true;
          return 'token_error';
        } else {
          console.error("Failed to paint pixel:", data.message);
          return false;
        }
      } catch (e) {
        console.error("Paint pixel request failed:", e);
        return false;
      }
    },
    // Image Processing
    loadImage: (file) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = URL.createObjectURL(file)
      })
    },
    canvasToDataURL: (canvas) => {
      return canvas.toDataURL("image/png")
    },
    dataURLToBlob: (dataurl) => {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    },
    blobToBase64: (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    },
    base64ToBlob: (base64) => {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new Blob([bytes], {
        type: 'image/png'
      });
    },
    arrayToCanvas: (data, width, height) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(width, height);
      imageData.data.set(data);
      ctx.putImageData(imageData, 0, 0);
      return canvas;
    },
    // CAPTCHA
    detectSitekey: () => {
      if (this._cachedSitekey) return this._cachedSitekey;

      // Try iframe
      const iframes = document.querySelectorAll('iframe[src*="turnstile.cloudflar"]');
      for (const iframe of iframes) {
        const match = iframe.src.match(/sitekey=([0-9a-zA-X_-]{20,})/i);
        if (match && match[1] && match[1].length > 10) {
          this._cachedSitekey = match[1];
          console.log("🔍 Sitekey detected from iframe:", this._cachedSitekey);
          return this._cachedSitekey;
        }
      }

      // Try global variable
      if (typeof window !== 'undefined' && window.__TURNSTILE_SITEKEY && window.__TURNSTILE_SITEKEY.length > 10) {
        this._cachedSitekey = window.__TURNSTILE_SITEKEY;
        console.log("🔍 Sitekey detected from global variable:", this._cachedSitekey);
        return this._cachedSitekey;
      }

      // Try script tags for inline sitekey
      const scripts = document.querySelectorAll('script');
      for (const script of scripts) {
        const content = script.textContent || script.innerHTML;
        const sitekeyMatch = content.match(/sitekey['":\s]+(['"0-9a-zA-X_-]{20,})/i);
        if (sitekeyMatch && sitekeyMatch[1] && sitekeyMatch[1].length > 10) {
          this._cachedSitekey = sitekeyMatch[1].replace(/['"]/g, '');
          console.log("🔍 Sitekey detected from...
      `
    },
    // Wait for element
    waitForSelector: (selector, interval = 100, timeout = 5000) => {
      return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const check = () => {
          const element = document.querySelector(selector);
          if (element) {
            resolve(element);
          } else if (Date.now() - startTime > timeout) {
            reject(new Error(`Timeout waiting for selector: ${selector}`));
          } else {
            setTimeout(check, interval);
          }
        };
        check();
      });
    },
    // Notifications
    sendNotification: (title, message) => {
      if (!state.notificationsEnabled) return;
      if (!state.notifyOnlyWhenUnfocused || !document.hasFocus()) {
        const now = Date.now();
        if (now - state.lastNotificationTime > state.notificationIntervalMinutes * 60 * 1000) {
          if (Notification.permission === "granted") {
            new Notification(title, {
              body: message
            });
            state.lastNotificationTime = now;
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                new Notification(title, {
                  body: message
                });
                state.lastNotificationTime = now;
              }
            });
          }
        }
      }
    }
  }

  // --- Core Logic ---
  let _resolveToken;
  let tokenPromise = new Promise((resolve) => {
    _resolveToken = resolve;
  });
  let tokenGenerationInProgress = false;

  async function handleCaptcha() {
    if (tokenGenerationInProgress) {
      console.log("Token generation already in progress. Waiting for existing promise...");
      return tokenPromise;
    }
    tokenGenerationInProgress = true;
    try {
      if (state.tokenSource === "generator") {
        const token = await handleCaptchaWithRetry();
        state.turnstileToken = token;
        _resolveToken(token);
        return token;
      } else if (state.tokenSource === "manual") {
        console.log("🎯 Manual mode: Waiting for user to paint a pixel...");
        Utils.sendNotification("WPlace Bot", "Manual CAPTCHA required. Please paint a pixel manually to get a new token.");
        const token = await new Promise(resolve => {
          // This promise is resolved by a listener on the paint event
          // The event handler will capture the token and resolve this promise
          _resolveToken = resolve;
        });
        state.turnstileToken = token;
        return token;
      } else if (state.tokenSource === "hybrid") {
        try {
          const token = await handleCaptchaWithRetry();
          state.turnstileToken = token;
          _resolveToken(token);
          return token;
        } catch (generatorError) {
          console.warn("Generator failed, falling back to manual pixel placement...");
          const fallbackToken = await handleCaptchaFallback();
          state.turnstileToken = fallbackToken;
          _resolveToken(fallbackToken);
          return fallbackToken;
        }
      }
    } catch (error) {
      console.error("Main CAPTCHA handling failed:", error);
      throw error;
    } finally {
      tokenGenerationInProgress = false;
    }
  }
  async function handleCaptchaWithRetry() {
    const startTime = Date.now();
    try {
      const sitekey = Utils.detectSitekey();
      console.log("🔑 Generating Turnstile token for sitekey:", sitekey);
      if (typeof window !== "undefined" && window.navigator) {
        console.log("🧭 UA:", window.navigator.userAgent, "Platform:", window.navigator.platform);
      }
      const token = await Utils.generatePaintToken(sitekey);
      if (token && token.length > 20) {
        const elapsed = Math.round(Date.now() - startTime);
        console.log(`✅ Turnstile token generated successfully in ${elapsed}ms`);
        return token;
      } else {
        throw new Error("Invalid or empty token received");
      }
    } catch (error) {
      const elapsed = Math.round(Date.now() - startTime);
      console.log(`❌ Turnstile token generation failed after ${elapsed}ms:`, error);
      throw error;
    }
  }
  async function handleCaptchaFallback() {
    // Implementation for fallback token generation would go here
    // This is a placeholder for browser automation fallback
    console.log("🔄 Attempting fallback token generation...");
    return null;
  }
  function inject(callback) {
    const script = document.createElement('script');
    script.textContent = `(${callback})();`;
    document.documentElement?.appendChild(script);
    script.remove();
  }
  inject(() => {
    const fetchedBlobQueue = new Map();
    window.addEventListener('message', (event) => {
      const {
        source,
        blobID,
        blobData
      } = event.data;
      if (source === 'auto-image-overlay' && blobID && blobData) {
        const callback = fetchedBlobQueue.get(blobID);
        if (typeof callback === 'function') {
          callback(blobData);
        }
        fetchedBlobQueue.delete(blobID);
      }
    });
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      const response = await originalFetch.apply(this, args);
      const url = (args[0] instanceof Request) ? args[0].url : args[0];
      if (typeof url === "string") {
        if (url.includes("https://backend.wplace.live/s0/pixel/")) {
          try {
            const payload = JSON.parse(args[1].body);
            if (payload.t) {
              window.postMessage({
                source: 'auto-image-bot',
                type: 'token_found',
                token: payload.t
              }, window.location.origin);
            }
          } catch {}
        }
      }
      return response;
    };
  });

  async function createUI() {
    await detectLanguage()
    const existingContainer = document.getElementById("wplace-image-bot-container")
    const existingStats = document.getElementById("wplace-stats-container")
    const existingSettings = document.getElementById("wplace-settings-container")
    const existingResizeContainer = document.querySelector(".resize-container")
    const existingResizeOverlay = document.querySelector(".resize-overlay")
    if (existingContainer) existingContainer.remove()
    if (existingStats) existingStats.remove()
    if (existingSettings) existingSettings.remove()
    if (existingResizeContainer) existingResizeContainer.remove()
    if (existingResizeOverlay) existingResizeOverlay.remove()
    loadThemePreference()
    loadLanguagePreference()
    const theme = getCurrentTheme()
    applyTheme() // <- new: set CSS vars and theme class before building UI
    const fontAwesome = document.createElement("link")
    fontAwesome.rel = "stylesheet"
    fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    document.head.appendChild(fontAwesome)
    if (theme.fontFamily.includes("Press Start 2P")) {
      const googleFonts = document.createElement("link")
      googleFonts.rel = "stylesheet"
      googleFonts.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
      document.head.appendChild(googleFonts)
    }
    // Link external CSS files
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://staninna.github.io/WPlace-AutoBOT/decoupled-css/auto-image-styles.css'; // TODO: Before merge change to https://raw.githubusercontent.com/Wplace-AutoBot/WPlace-AutoBOT/refs/heads/main/auto-image-styles.css
    cssLink.setAttribute('data-wplace-theme', 'true');
    document.head.appendChild(cssLink);
    const container = document.createElement("div")
    container.id = "wplace-image-bot-container"
    container.innerHTML = `
 <div class="wplace-header">
 <div class="wplace-header-title">
 <i class="fas fa-image"></i>
 <span>${Utils.t("title")}</span>
 </div>
 <div class="wplace-header-controls">
 <button id="settingsBtn" class="wplace-header-btn" title="${Utils.t("settings")}">
 <i class="fas fa-cog"></i>
 </button>
 <button id="statsBtn" class="wplace-header-btn" title="Show Stats">
 <i class="fas fa-chart-bar"></i>
 </button>
 <button id="compactBtn" class="wplace-header-btn" title="Compact Mode">
 <i class="fas fa-compress"></i>
 </button>
 <button id="minimizeBtn" class="wplace-header-btn" title="${Utils.t("minimize")}">
 <i class="fas fa-minus"></i>
 </button>
 </div>
 </div>
 <div class="wplace-content">
 <div class="wplace-status-section">
 <div id="statusText" class="wplace-status status-default">
 ${Utils.t("initMessage")}
 </div>
 <div class="wplace-progress">
 <div id="progressBar" class="wplace-progress-bar" style="width: 0%"></div>
 </div>
 </div>
 <div class="wplace-section">
 <div class="wplace-section-title">🖼️ Image Management</div>
 <div class="wplace-controls">
 <div class="wplace-row">
 <button id="uploadBtn" class="wplace-btn wplace-btn-upload" disabled title="🔄 Waiting for initial setup to complete...">
 <i class="fas fa-upload"></i>
 <span>${Utils.t("uploadImage")}</span>
 </button>
 <button id="resizeBtn" class="wplace-btn wplace-btn-primary" disabled>
 <i class="fas fa-expand"></i>
 <span>${Utils.t("resizeImage")}</span>
 </button>
 </div>
 <div class="wplace-row single">
 <button id="selectPosBtn" class="wplace-btn wplace-btn-select" disabled>
 <i class="fas fa-crosshairs"></i>
 <span>${Utils.t("selectPosition")}</span>
 </button>
 </div>
 </div>
 </div>
 <div class="wplace-section">
 <div class="wplace-section-title">🎮 Painting Control</div>
 <div class="wplace-controls">
 <div class="wplace-row">
 <button id="startBtn" class="wplace-btn wplace-btn-start" disabled>
 <i class="fas fa-play"></i>
 <span>${Utils.t("startPainting")}</span>
 </button>
 <button id="stopBtn" class="wplace-btn wplace-btn-stop" disabled>
 <i class="fas fa-stop"></i>
 <span>${Utils.t("stopPainting")}</span>
 </button>
 </div>
 <div class="wplace-row single">
 <button id="toggleOverlayBtn" class="wplace-btn wplace-btn-overlay" disabled>
 <i class="fas fa-eye"></i>
 <span>${Utils.t("toggleOverlay")}</span>
 </button>
 </div>
 </div>
 </div>
 <div class="wplace-section">
 <div class="wplace-section-title">⏱️ ${Utils.t("cooldownSettings")}</div>
 <div class="wplace-cooldown-control">
 <label id="cooldownLabel">${Utils.t("waitCharges")}:</label>
 <div class="wplace-slider-container">
 <input type="range" id="cooldownSlider" class="wplace-slider" min="1" max="1" value="${state.cooldownChargeThreshold}">
 <span id="cooldownValue" class="wplace-cooldown-value">${state.cooldownChargeThreshold}</span>
 </div>
 </div>
 </div>
 <div class="wplace-section">
 <div class="wplace-section-title">💾 Data Management</div>
 <div class="wplace-controls">
 <div class="wplace-row">
 <button id="saveBtn" class="wplace-btn wplace-btn-primary" disabled>
 <i class="fas fa-save"></i>
 <span>${Utils.t("saveData")}</span>
 </button>
 <button id="loadBtn" class="wplace-btn wplace-btn-primary" disabled title="🔄 Waiting for token generator to initialize...">
 <i class="fas fa-folder-open"></i>
 <span>${Utils.t("loadData")}</span>
 </button>
 </div>
 <div class="wplace-row">
 <button id="saveToFileBtn" class="wplace-btn wplace-btn-file" disabled>
 <i class="fas fa-download"></i>
 <span>${Utils.t("saveToFile")}</span>
 </button>
 <button id="loadFromFileBtn" class="wplace-btn wplace-btn-file" disabled title="🔄 Waiting for token generator to initialize...">
 <i class="fas fa-upload"></i>
 <span>${Utils.t("loadFromFile")}</span>
 </button>
 </div>
 </div>
 </div>
 </div>
 `
    // Stats Window - Separate UI
    const statsContainer = document.createElement("div")
    statsContainer.id = "wplace-stats-container"
    statsContainer.style.display = "none"
    statsContainer.innerHTML = `
 <div class="wplace-header">
 <div class="wplace-header-title">
 <i class="fas fa-chart-bar"></i>
 <span>Painting Stats</span>
 </div>
 <div class="wplace-header-controls">
 <button id="refreshChargesBtn" class="wplace-header-btn" title="Refresh Charges">
 <i class="fas fa-sync"></i>
 </button>
 <button id="closeStatsBtn" class="wplace-header-btn" title="Close Stats">
 <i class="fas fa-times"></i>
 </button>
 </div>
 </div>
 <div class="wplace-content">
 <div class="wplace-stats">
 <div id="statsArea">
 <div class="wplace-stat-item">
 <div class="wplace-stat-label"><i class="fas fa-info-circle"></i> ${Utils.t("initMessage")}</div>
 </div>
 </div>
 </div>
 </div>
 `
    // Modern Settings Container with Theme Support
    // Use the theme variable already declared at the top of createUI function
    const settingsContainer = document.createElement("div")
    settingsContainer.id = "wplace-settings-container"
    // Apply theme-based styling
    const themeBackground = theme.primary ? `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary || theme.primary} 100%)` : `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
    settingsContainer.className = 'wplace-settings-container-base'; // Apply theme-specific background
    settingsContainer.style.background = themeBackground;
    settingsContainer.style.cssText += `
 min-width: 420px;
 max-width: 480px;
 z-index: 99999;
 color: ${theme.text || 'white'};
 font-family: ${theme.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
 box-shadow: ${theme.boxShadow || '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'};
 backdrop-filter: ${theme.backdropFilter || 'blur(10px)'};
 overflow: hidden;
 animation: settingsSlideIn 0.4s ease-out;
 ${theme.animations?.glow ? ` box-shadow: ${theme.boxShadow || '0 20px 40px rgba(0,0,0,0.3)'}, 0 0 30px ${theme.highlight || theme.neon || '#00ffff'}; ` : ''}
 `;
    settingsContainer.innerHTML = `
 <div class="wplace-settings-header">
 <div class="wplace-settings-title-wrapper">
 <h3 class="wplace-settings-title">
 <i class="fas fa-cog wplace-settings-icon"></i> ${Utils.t("settings")}
 </h3>
 <button id="closeSettingsBtn" class="wplace-settings-close-btn">✕</button>
 </div>
 </div>
 <div class="wplace-settings-content">
 <div class="wplace-settings-section">
 <label class="wplace-settings-section-label">
 <i class="fas fa-key wplace-icon-key"></i> Token Source
 </label>
 <div class="wplace-settings-section-wrapper">
 <select id="tokenSourceSelect" class="wplace-settings-select">
 <option value="generator" ${state.tokenSource === 'generator' ? 'selected' : ''} class="wplace-settings-option">🤖 Automatic Token Generator (Recommended)</option>
 <option value="hybrid" ${state.tokenSource === 'hybrid' ? 'selected' : ''} class="wplace-settings-option">🔄 Generator + Auto Fallback</option>
 <option value="manual" ${state.tokenSource === 'manual' ? 'selected' : ''} class="wplace-settings-option">🎯 Manual Pixel Placement</option>
 </select>
 <p class="wplace-settings-description">
 Generator mode creates tokens automatically. Hybrid mode falls back to manual when generator fails. Manual mode only uses pixel placement.
 </p>
 </div>
 </div>
 <div class="wplace-settings-section">
 <label class="wplace-settings-section-label">
 <i class="fas fa-robot wplace-icon-robot"></i> ${Utils.t("automation")}
 </label>
 </div>
 <div class="wplace-settings-section">
 <label class="wplace-settings-section-label" style="color: ${theme.text || 'white'};">
 <i class="fas fa-eye wplace-icon-eye" style="color: ${theme.highlight || '#48dbfb'};"></i> Overlay Settings
 </label>
 <div class="wplace-settings-section-wrapper wplace-overlay-wrapper" style="
 background: ${theme.accent ? `${theme.accent}20` : 'rgba(255,255,255,0.1)'};
 border-radius: ${theme.borderRadius || '12px'};
 border: 1px solid ${theme.accent || 'rgba(255,255,255,0.1)'};
 ${theme.animations?.glow ? ` box-shadow: 0 0 15px ${theme.accent || 'rgba(255,255,255,0.1)'}33; ` : ''}
 ">
 <div class="wplace-overlay-opacity-control">
 <div class="wplace-overlay-opacity-header">
 <span class="wplace-overlay-opacity-label" style="color: ${theme.text || 'white'};">Overlay Opacity</span>
 <div id="overlayOpacityValue" class="wplace-overlay-opacity-value" style="
 background: ${theme.secondary || 'rgba(0,0,0,0.2)'};
 color: ${theme.text || 'white'};
 border-radius: ${theme.borderRadius === '0' ? '0' : '6px'};
 border: 1px solid ${theme.accent || 'transparent'};
 ">${Math.round(state.overlayOpacity * 100)}%</div>
 </div>
 <input type="range" id="overlayOpacitySlider" class="wplace-slider" min="0" max="1" step="0.01" value="${state.overlayOpacity}">
 </div>
 <div class="wplace-setting-row">
 <label class="wplace-toggle-label" style="color: ${theme.text || 'white'};">
 <i class="fas fa-globe-americas wplace-icon-globe" style="color: #6a93ff;"></i> Blue Marble
 </label>
 <input type="checkbox" id="enableBlueMarbleToggle" class="wplace-toggle" ${state.blueMarbleEnabled ? 'checked' : ''}>
 </div>
 <div class="wplace-setting-row">
 <label class="wplace-toggle-label" style="color: ${theme.text || 'white'};">
 <i class="fas fa-braille wplace-icon-braille" style="color: #ff8800;"></i> Dithering
 </label>
 <input type="checkbox" id="ditherToggle" class="wplace-toggle" ${state.ditheringEnabled ? 'checked' : ''}>
 </div>
 <div class="wplace-setting-row">
 <label class="wplace-toggle-label" style="color: ${theme.text || 'white'};">
 <i class="fas fa-paint-brush wplace-icon-paint" style="color: #ffffff;"></i> Paint White Pixels
 </label>
 <input type="checkbox" id="paintWhitePixelsToggle" class="wplace-toggle" ${state.paintWhitePixels ? 'checked' : ''}>
 </div>
 </div>
 </div>
 <div class="wplace-settings-section">
 <label class="wplace-settings-section-label">
 <i class="fas fa-palette wplace-icon-palette"></i> Color Matching
 </label>
 <div class="wplace-settings-section-wrapper">
 <label for="colorAlgorithmSelect">Algorithm:</label>
 <select id="colorAlgorithmSelect" class="wplace-settings-select">
 <option value="lab" ${state.colorMatchingAlgorithm === 'lab' ? 'selected' : ''}>CIELAB (Perceptually Uniform)</option>
 <option value="rgb" ${state.colorMatchingAlgorithm === 'rgb' ? 'selected' : ''}>RGB (Simple)</option>
 </select>
 <div class="wplace-setting-row">
 <label class="wplace-toggle-label">
 Chroma Penalty
 </label>
 <input type="checkbox" id="enableChromaPenaltyToggle" class="wplace-toggle" ${state.enableChromaPenalty ? 'checked' : ''}>
 </div>
 <div class="wplace-slider-container">
 <label for="chromaSlider">Chroma Weight:</label>
 <input type="range" id="chromaSlider" min="0" max="1" step="0.01" value="${state.chromaPenaltyWeight}">
 <span id="chromaValue">${state.chromaPenaltyWeight}</span>
 </div>
 <div class="wplace-input-row">
 <label for="transparencyThresholdInput">Transparency Threshold:</label>
 <input type="number" id="transparencyThresholdInput" min="0" max="255" value="${state.customTransparencyThreshold}">
 </div>
 <div class="wplace-input-row">
 <label for="whiteThresholdInput">White Threshold:</label>
 <input type="number" id="whiteThresholdInput" min="200" max="255" value="${state.customWhiteThreshold}">
 </div>
 </div>
 <button id="resetColorSettingsBtn" class="wplace-btn wplace-btn-secondary">
 <i class="fas fa-undo"></i> Reset to Defaults
 </button>
 </div>
 <div class="wplace-settings-section">
 <label class="wplace-settings-section-label">
 <i class="fas fa-language wplace-icon-language"></i> ${Utils.t("language")}
 </label>
 <div class="wplace-settings-section-wrapper">
 <select id="languageSelect" class="wplace-settings-select">
 <option value="en" ${state.language === 'en' ? 'selected' : ''}>English</option>
 <option value="fr" ${state.language === 'fr' ? 'selected' : ''}>Français</option>
 <option value="de" ${state.language === 'de' ? 'selected' : ''}>Deutsch</option>
 <option value="es" ${state.language === 'es' ? 'selected' : ''}>Español</option>
 <option value="ru" ${state.language === 'ru' ? 'selected' : ''}>Русский</option>
 <option value="pt" ${state.language === 'pt' ? 'selected' : ''}>Português</option>
 <option value="id" ${state.language === 'id' ? 'selected' : ''}>Bahasa Indonesia</option>
 <option value="vi" ${state.language === 'vi' ? 'selected' : ''}>Tiếng Việt</option>
 <option value="zh" ${state.language === 'zh' ? 'selected' : ''}>中文 (简体)</option>
 <option value="ja" ${state.language === 'ja' ? 'selected' : ''}>日本語</option>
 <option value="ko" ${state.language === 'ko' ? 'selected' : ''}>한국어</option>
 </select>
 </div>
 </div>
 <div class="wplace-settings-section">
 <label class="wplace-settings-section-label">
 <i class="fas fa-palette wplace-icon-theme"></i> ${Utils.t("themeSettings")}
 </label>
 <div class="wplace-settings-section-wrapper">
 <select id="themeSelect" class="wplace-settings-select">
 <option value="Classic Autobot" ${CONFIG.currentTheme === 'Classic Autobot' ? 'selected' : ''}>Classic Autobot</option>
 <option value="Classic Light" ${CONFIG.currentTheme === 'Classic Light' ? 'selected' : ''}>Classic Light</option>
 <option value="Neon Retro" ${CONFIG.currentTheme === 'Neon Retro' ? 'selected' : ''}>Neon Retro</option>
 </select>
 </div>
 </div>
 </div>
 <button id="applySettingsBtn" class="wplace-settings-apply-btn">
 <i class="fas fa-check-circle"></i> ${Utils.t("applySettings")}
 </button>
 `
    document.body.appendChild(container)
    document.body.appendChild(statsContainer)
    document.body.appendChild(settingsContainer)
    addEventListeners()
    await initialize()
  }

  // Initial setup function
  async function initialize() {
    updateUI("waitingInit", "info")
    // Get max charges and available colors
    await Promise.all([
      fetchAvailableColors(),
      Utils.getCharges(),
      loadBotSettings(),
    ])
    // Initialize turnstile generator
    await initializeTokenGenerator()
    // Re-enable UI components
    updateControls(true)
    updateUI("initMessage", "default")
    // Check for saved progress
    const savedProgress = Utils.loadProgress()
    if (savedProgress) {
      const loadBtn = document.getElementById("loadBtn")
      if (loadBtn) {
        loadBtn.disabled = false
        loadBtn.title = "Click to load saved progress"
      }
      Utils.showAlert(Utils.t("savedDataFound"), "info", 5000)
    }
    state.isInitializing = false
  }

  function updateControls(enabled) {
    const uploadBtn = document.getElementById("uploadBtn")
    const resizeBtn = document.getElementById("resizeBtn")
    const selectPosBtn = document.getElementById("selectPosBtn")
    const startBtn = document.getElementById("startBtn")
    const stopBtn = document.getElementById("stopBtn")
    const toggleOverlayBtn = document.getElementById("toggleOverlayBtn")
    const saveBtn = document.getElementById("saveBtn")
    const loadBtn = document.getElementById("loadBtn")
    const saveToFileBtn = document.getElementById("saveToFileBtn")
    const loadFromFileBtn = document.getElementById("loadFromFileBtn")
    if (uploadBtn) uploadBtn.disabled = !enabled
    if (resizeBtn) resizeBtn.disabled = !enabled || !state.imageLoaded || !state.colorsChecked
    if (selectPosBtn) selectPosBtn.disabled = !enabled || !state.imageLoaded
    if (startBtn) startBtn.disabled = !enabled || !state.imageLoaded || !state.startPosition
    if (stopBtn) stopBtn.disabled = !state.isPainting
    if (toggleOverlayBtn) toggleOverlayBtn.disabled = !enabled || !state.imageLoaded
    if (saveBtn) saveBtn.disabled = !enabled
    if (loadBtn) loadBtn.disabled = !enabled
    if (saveToFileBtn) saveToFileBtn.disabled = !enabled
    if (loadFromFileBtn) loadFromFileBtn.disabled = !enabled
  }

  function updateUI(statusKey, type, args) {
    const statusText = document.getElementById("statusText")
    if (statusText) {
      statusText.textContent = Utils.t(statusKey, args)
      statusText.className = `wplace-status status-${type}`
    }
  }

  function updateStats() {
    const statsArea = document.getElementById("statsArea")
    if (!statsArea) return
    const theme = getCurrentTheme()
    const statsHTML = `
 <div class="wplace-stat-item">
 <div class="wplace-stat-label" style="color: ${theme.text}"><i class="fas fa-paint-roller wplace-icon-stats" style="color: ${theme.highlight}"></i> ${Utils.t("pixels")}</div>
 <div class="wplace-stat-value" style="color: ${theme.text}">${state.paintedPixels} / ${state.totalPixels}</div>
 </div>
 <div class="wplace-stat-item">
 <div class="wplace-stat-label" style="color: ${theme.text}"><i class="fas fa-battery-three-quarters wplace-icon-stats" style="color: ${theme.success}"></i> ${Utils.t("charges")}</div>
 <div class="wplace-stat-value" style="color: ${theme.text}">${state.charges} / ${state.maxCharges}</div>
 </div>
 <div class="wplace-stat-item">
 <div class="wplace-stat-label" style="color: ${theme.text}"><i class="fas fa-clock wplace-icon-stats" style="color: ${theme.warning}"></i> ${Utils.t("estimatedTime")}</div>
 <div class="wplace-stat-value" style="color: ${theme.text}">${getEstimatedTime()}</div>
 </div>
 <div class="wplace-stat-item">
 <div class="wplace-stat-label" style="color: ${theme.text}"><i class="fas fa-paint-brush wplace-icon-stats" style="color: ${theme.highlight}"></i> ${Utils.t("paintingSpeed")}</div>
 <div class="wplace-stat-value" style="color: ${theme.text}">${(state.paintingSpeedEnabled) ? state.paintingSpeed : 'N/A'} ${Utils.t("pixelsPerSecond")}</div>
 </div>
 <div class="wplace-stat-item">
 <div class="wplace-stat-label" style="color: ${theme.text}"><i class="fas fa-map-pin wplace-icon-stats" style="color: ${theme.text}"></i> Last Painted</div>
 <div class="wplace-stat-value" style="color: ${theme.text}">X: ${state.lastPosition?.x || 'N/A'}, Y: ${state.lastPosition?.y || 'N/A'}</div>
 </div>
 <div class="wplace-stat-item">
 <div class="wplace-stat-label" style="color: ${theme.text}"><i class="fas fa-image wplace-icon-stats" style="color: ${theme.text}"></i> Image Size</div>
 <div class="wplace-stat-value" style="color: ${theme.text}">${state.imageData?.width || 'N/A'}x${state.imageData?.height || 'N/A'}</div>
 </div>
 `
    statsArea.innerHTML = statsHTML
  }

  function getEstimatedTime() {
    if (state.totalPixels === 0 || state.paintedPixels === 0) return "N/A"
    const remainingPixels = state.totalPixels - state.paintedPixels
    const estimatedTimeMs = remainingPixels * (CONFIG.COOLDOWN_DEFAULT + 1000)
    return Utils.formatTime(estimatedTimeMs)
  }

  function updateDataButtons() {
    const saveBtn = document.getElementById("saveBtn")
    const saveToFileBtn = document.getElementById("saveToFileBtn")
    if (saveBtn) saveBtn.disabled = !state.imageLoaded
    if (saveToFileBtn) saveToFileBtn.disabled = !state.imageLoaded
  }

  async function fetchAvailableColors() {
    try {
      updateUI("checkingColors", "info")
      const res = await fetch("https://backend.wplace.live/s0/colors")
      if (!res.ok) throw new Error("Failed to fetch colors")
      const colors = await res.json()
      state.availableColors = colors
      state.colorsChecked = true
      updateUI("colorsFound", "success", {
        count: colors.length
      })
      console.log(`✅ Fetched ${colors.length} available colors.`)
      // Enable the main button group after colors are fetched
      const uploadBtn = document.getElementById("uploadBtn")
      if (uploadBtn) {
        uploadBtn.disabled = false
        uploadBtn.title = ""
      }
    } catch (e) {
      console.error("Error fetching colors:", e)
      updateUI("noColorsFound", "error")
      state.colorsChecked = false
      await Utils.sleep(5000)
      // Retry
      if (!state.isPainting) fetchAvailableColors()
    }
  }

  let autoSaveIntervalId = null;
  const startAutoSave = () => {
    if (autoSaveIntervalId) {
      clearInterval(autoSaveIntervalId);
    }
    autoSaveIntervalId = setInterval(() => {
      // Check if there's new progress to save
      if (state.paintedPixels > state._lastSavePixelCount || Date.now() - state._lastSaveTime > 300000) { // save every 5 mins or when a new pixel is painted
        if (Utils.saveProgress()) {
          state._lastSavePixelCount = state.paintedPixels;
          state._lastSaveTime = Date.now();
          updateUI("autoSaved", "success");
        }
      }
    }, 15000); // Check every 15 seconds
  };
  const stopAutoSave = () => {
    if (autoSaveIntervalId) {
      clearInterval(autoSaveIntervalId);
    }
    autoSaveIntervalId = null;
  };

  async function paintNextPixel() {
    if (!state.isPainting) return;

    if (state.charges < state.cooldownChargeThreshold) {
      const remainingTime = Math.max(0, state.nextAvailablePixelTime - Date.now());
      updateUI("noChargesThreshold", "info", {
        threshold: state.cooldownChargeThreshold,
        current: state.charges,
        time: Utils.formatTime(remainingTime)
      });
      console.log(`Waiting for charges. Need ${state.cooldownChargeThreshold}, have ${state.charges}. Waiting for ${Utils.formatTime(remainingTime)}`);

      if (state.notificationsEnabled && state.notifyOnChargesReached && remainingTime > 0) {
        Utils.sendNotification("WPlace Bot", `Waiting for ${state.cooldownChargeThreshold} charges. Next pixel in ${Utils.formatTime(remainingTime)}`);
      }

      await Utils.sleep(Math.max(1000, remainingTime));
      await Utils.getCharges();
      paintNextPixel();
      return;
    }

    try {
      const {
        x,
        y,
        color
      } = findNextPixelToPaint();
      if (x === null) {
        state.isPainting = false;
        updateUI("paintingComplete", "success", {
          count: state.paintedPixels
        });
        stopAutoSave();
        return;
      }
      const pixelBatch = [{
        x,
        y,
        c: color
      }];
      if (state.paintingSpeedEnabled && state.paintingSpeed > 1) {
        let batchSize = state.paintingSpeed;
        if (state.batchMode === 'random') {
          batchSize = Math.floor(Math.random() * (state.randomBatchMax - state.randomBatchMin + 1)) + state.randomBatchMin;
        }
        for (let i = 1; i < batchSize; i++) {
          const next = findNextPixelToPaint();
          if (next.x !== null) {
            pixelBatch.push({
              x: next.x,
              y: next.y,
              c: next.color
            });
          } else {
            break; // No more pixels to paint
          }
        }
      }

      const turnstileToken = await handleCaptcha();

      if (turnstileToken === 'token_error') {
        // This is a special return from handleCaptcha when we need to wait for user to paint a pixel
        updateUI("captchaNeeded", "warning")
        return;
      }
      const success = await Utils.paintPixels(pixelBatch);

      if (success === "token_error") {
        updateUI("captchaNeeded", "warning")
        return;
      }

      if (success) {
        for (const pixel of pixelBatch) {
          state.paintedPixels++;
          state.lastPosition = {
            x: pixel.x,
            y: pixel.y
          };
          markPixelAsPainted(pixel.x, pixel.y);
          updateProgressBar();
        }
        updateUI("paintingProgress", "info", {
          painted: state.paintedPixels,
          total: state.totalPixels
        });
        await Utils.getCharges();
        const delay = (state.charges > 0) ? (CONFIG.COOLDOWN_DEFAULT / state.paintingSpeed) : 1000;
        state.paintingTimeoutId = setTimeout(paintNextPixel, delay);
      } else {
        updateUI("paintingError", "error")
      }
    } catch (e) {
      console.error("Error painting pixel:", e)
      updateUI("paintingError", "error")
      stopPainting()
    }
  }

  function startPainting() {
    if (state.isPainting) return;
    state.isPainting = true;
    updateUI("startPaintingMsg", "success");
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
    document.getElementById("selectPosBtn").disabled = true;
    document.getElementById("uploadBtn").disabled = true;
    document.getElementById("saveBtn").disabled = true;
    document.getElementById("loadBtn").disabled = true;
    startAutoSave();
    paintNextPixel();
  }

  function stopPainting() {
    state.isPainting = false;
    clearTimeout(state.paintingTimeoutId);
    updateUI("paintingStopped", "info");
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("selectPosBtn").disabled = false;
    document.getElementById("uploadBtn").disabled = false;
    document.getElementById("saveBtn").disabled = false;
    document.getElementById("loadBtn").disabled = false;
    stopAutoSave();
  }

  // Find the next pixel to paint based on the `paintedMap`
  function findNextPixelToPaint() {
    if (!state.imageData || !state.paintedMap) {
      return {
        x: null,
        y: null,
        color: null
      };
    }
    const width = state.imageData.width;
    const height = state.imageData.height;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (!state.paintedMap[y][x]) {
          const globalX = state.startPosition.x + x;
          const globalY = state.startPosition.y + y;
          const color = getColorAt(x, y);
          if (color !== null) {
            return {
              x: globalX,
              y: globalY,
              color: color.id
            };
          }
        }
      }
    }
    return {
      x: null,
      y: null,
      color: null
    };
  }

  // Mark a pixel as painted in the `paintedMap`
  function markPixelAsPainted(x, y) {
    if (!state.paintedMap || !state.startPosition) return;
    const localX = x - state.startPosition.x;
    const localY = y - state.startPosition.y;
    if (localX >= 0 && localX < state.imageData.width && localY >= 0 && localY < state.imageData.height) {
      state.paintedMap[localY][localX] = true;
    }
  }

  // Get the closest color for a given pixel from the image data
  function getColorAt(x, y) {
    if (!state.imageData || !state.imageData.pixels) return null;
    const i = (y * state.imageData.width + x) * 4;
    const r = state.imageData.pixels[i];
    const g = state.imageData.pixels[i + 1];
    const b = state.imageData.pixels[i + 2];
    const a = state.imageData.pixels[i + 3];
    // Don't paint if pixel is fully transparent
    if (a < state.customTransparencyThreshold) return null;
    // Don't paint white pixels if setting is disabled
    if (!state.paintWhitePixels && r >= state.customWhiteThreshold && g >= state.customWhiteThreshold && b >= state.customWhiteThreshold) return null;
    return findClosestColor(r, g, b);
  }

  // Function to find the closest color in the palette
  function findClosestColor(r, g, b) {
    if (!state.availableColors) {
      console.warn("Available colors not fetched yet.");
      return null;
    }
    let closestColor = null;
    let minDistance = Infinity;

    // Convert input RGB to CIELAB if using that algorithm
    let lab1 = null;
    if (state.colorMatchingAlgorithm === 'lab') {
      lab1 = rgbToCIE(r, g, b);
    }

    for (const key in CONFIG.COLOR_MAP) {
      const paletteColor = CONFIG.COLOR_MAP[key];
      if (paletteColor.rgb === null) continue; // Skip transparent
      let distance;
      if (state.colorMatchingAlgorithm === 'lab') {
        const lab2 = rgbToCIE(paletteColor.rgb.r, paletteColor.rgb.g, paletteColor.rgb.b);
        distance = deltaE(lab1, lab2);
        // Apply chroma penalty if enabled
        if (state.enableChromaPenalty) {
          const lDiff = Math.abs(lab1[0] - lab2[0]);
          const abDiff = Math.sqrt(Math.pow(lab1[1] - lab2[1], 2) + Math.pow(lab1[2] - lab2[2], 2));
          distance += abDiff * state.chromaPenaltyWeight;
        }
      } else {
        // RGB distance
        distance = Math.sqrt(
          Math.pow(r - paletteColor.rgb.r, 2) +
          Math.pow(g - paletteColor.rgb.g, 2) +
          Math.pow(b - paletteColor.rgb.b, 2)
        );
      }
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = paletteColor;
      }
    }
    return closestColor;
  }

  // CIELAB Color matching functions
  const sRGB_to_XYZ = (r, g, b) => {
    const convert = (c) => {
      c /= 255;
      return (c > 0.04045) ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
    };
    const R = convert(r);
    const G = convert(g);
    const B = convert(b);
    const X = R * 0.4124 + G * 0.3576 + B * 0.1805;
    const Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
    const Z = R * 0.0193 + G * 0.1192 + B * 0.9505;
    return [X, Y, Z];
  };
  const XYZ_to_CIE = (X, Y, Z) => {
    const refX = 0.95047;
    const refY = 1.0;
    const refZ = 1.08883;
    const convert = (t) => {
      t /= 100;
      return (t > 0.008856) ? Math.pow(t, 1 / 3) : (7.787 * t) + (16 / 116);
    };
    const xr = convert(X / refX);
    const yr = convert(Y / refY);
    const zr = convert(Z / refZ);
    const L = (116 * yr) - 16;
    const a = 500 * (xr - yr);
    const b = 200 * (yr - zr);
    return [L, a, b];
  };
  const rgbToCIE = (r, g, b) => {
    const [X, Y, Z] = sRGB_to_XYZ(r, g, b);
    return XYZ_to_CIE(X, Y, Z);
  };
  const deltaE = (labA, labB) => {
    const deltaL = labA[0] - labB[0];
    const deltaA = labA[1] - labB[1];
    const deltaB = labA[2] - labB[2];
    const c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    const c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    const deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    return Math.sqrt(deltaL * deltaL + deltaC * deltaC + deltaH * deltaH);
  };

  function updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
      const progress = state.totalPixels > 0 ? (state.paintedPixels / state.totalPixels) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }
  }

  // Image processing class with dithering
  class ImageProcessor {
    constructor(file) {
      this.file = file;
      this.img = null;
      this.canvas = null;
      this.ctx = null;
    }
    async load() {
      if (this.file) {
        this.img = await Utils.loadImage(this.file);
      }
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.img.width;
      this.canvas.height = this.img.height;
      this.ctx = this.canvas.getContext('2d');
      this.ctx.drawImage(this.img, 0, 0);
      return this;
    }
    resize(width, height) {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(this.canvas, 0, 0, width, height);
      this.canvas = tempCanvas;
      this.ctx = tempCtx;
      state.imageData.width = width;
      state.imageData.height = height;
    }
    getImageData() {
      return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    }
    async processImage() {
      if (!this.img) throw new Error("Image not loaded");
      const data = this.getImageData();
      const newPixels = new Uint8ClampedArray(data.length);
      let totalValidPixels = 0;
      const width = this.canvas.width;
      const height = this.canvas.height;
      state.paintedMap = new Array(height).fill(null).map(() => new Array(width).fill(false));
      const applyFSDither = () => {
        const data = this.getImageData();
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r0 = data[i],
              g0 = data[i + 1],
              b0 = data[i + 2],
              a0 = data[i + 3];
            if (a0 < state.customTransparencyThreshold) {
              newPixels[i] = newPixels[i + 1] = newPixels[i + 2] = newPixels[i + 3] = 0;
              continue;
            }
            if (!state.paintWhitePixels && r0 >= state.customWhiteThreshold && g0 >= state.customWhiteThreshold && b0 >= state.customWhiteThreshold) {
              newPixels[i] = newPixels[i + 1] = newPixels[i + 2] = newPixels[i + 3] = 0;
              continue;
            }
            const closest = findClosestColor(r0, g0, b0);
            const nr = closest.rgb.r;
            const ng = closest.rgb.g;
            const nb = closest.rgb.b;
            newPixels[i] = nr;
            newPixels[i + 1] = ng;
            newPixels[i + 2] = nb;
            newPixels[i + 3] = a0;
            totalValidPixels++;
            const diffuse = (dx, dy, er, eg, eb, factor) => {
              if (x + dx < 0 || x + dx >= width || y + dy < 0 || y + dy >= height) return;
              const idx = ((y + dy) * width + (x + dx)) * 4;
              data[idx] = data[idx] + er * factor;
              data[idx + 1] = data[idx + 1] + eg * factor;
              data[idx + 2] = data[idx + 2] + eb * factor;
            };
            const er = r0 - nr;
            const eg = g0 - ng;
            const eb = b0 - nb;
            diffuse(x + 1, y, er, eg, eb, 7 / 16);
            diffuse(x - 1, y + 1, er, eg, eb, 3 / 16);
            diffuse(x, y + 1, er, eg, eb, 5 / 16);
            diffuse(x + 1, y + 1, er, eg, eb, 1 / 16);
          }
        }
      };
      // Skip expensive dithering while user is dragging sliders
      if (state.ditheringEnabled && !_isDraggingSize) {
        applyFSDither();
      } else {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i],
            g = data[i + 1],
            b = data[i + 2],
            a = data[i + 3];
          const x = (i / 4) % width;
          const y = Math.floor((i / 4) / width);
          // Don't paint if pixel is fully transparent
          if (a < state.customTransparencyThreshold) {
            newPixels[i] = newPixels[i + 1] = newPixels[i + 2] = newPixels[i + 3] = 0;
            continue;
          }
          // Don't paint white pixels if setting is disabled
          if (!state.paintWhitePixels && r >= state.customWhiteThreshold && g >= state.customWhiteThreshold && b >= state.customWhiteThreshold) {
            newPixels[i] = newPixels[i + 1] = newPixels[i + 2] = newPixels[i + 3] = 0;
            continue;
          }
          const closest = findClosestColor(r, g, b);
          newPixels[i] = closest.rgb.r;
          newPixels[i + 1] = closest.rgb.g;
          newPixels[i + 2] = closest.rgb.b;
          newPixels[i + 3] = a;
          totalValidPixels++;
        }
      }
      this.pixels = newPixels;
      this.totalValidPixels = totalValidPixels;
      return this;
    }
  }

  // --- UI and Event Handlers ---
  let _overlayCanvas = null;
  let _maskCanvas = null;
  let _ctx = null;
  let _maskCtx = null;
  let _isDragging = false;
  let _dragStartX, _dragStartY;
  let _offsetX = 0,
    _offsetY = 0;
  let _scale = 1;
  let _isDraggingSize = false;
  let _isResizing = false;
  let _isMoving = false;
  let _originalSize = {
    w: 0,
    h: 0
  };
  let _resizeBox = null;
  let _resizeOverlay = null;

  function createOverlayCanvas() {
    if (_overlayCanvas) _overlayCanvas.remove();
    _overlayCanvas = document.createElement("canvas");
    _overlayCanvas.id = "wplace-image-overlay";
    _overlayCanvas.style.cssText = `
 position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none;
 opacity: ${state.overlayOpacity}; display: none; image-rendering: pixelated;
`;
    document.body.appendChild(_overlayCanvas);
    _ctx = _overlayCanvas.getContext('2d');
    _overlayCanvas.width = state.imageData.width;
    _overlayCanvas.height = state.imageData.height;
    if (state.blueMarbleEnabled) {
      _overlayCanvas.style.backgroundImage = 'url("https://wplace.live/public/images/bluemarble.jpg")';
      _overlayCanvas.style.backgroundSize = `${state.imageData.width}px ${state.imageData.height}px`;
      _overlayCanvas.style.backgroundPosition = `-${state.startPosition.x}px -${state.startPosition.y}px`;
    } else {
      _overlayCanvas.style.backgroundImage = 'none';
    }
  }

  function createMaskCanvas() {
    if (_maskCanvas) _maskCanvas.remove();
    _maskCanvas = document.createElement("canvas");
    _maskCanvas.id = "wplace-mask-overlay";
    _maskCanvas.style.cssText = `
 position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none;
 opacity: 1; image-rendering: pixelated; display: none;
`;
    document.body.appendChild(_maskCanvas);
    _maskCtx = _maskCanvas.getContext('2d');
    _maskCanvas.width = state.imageData.width;
    _maskCanvas.height = state.imageData.height;
  }

  let _maskData = null;
  let _dirtyRegions = new Set();
  const _markDirty = (x, y) => {
    _dirtyRegions.add(`${x},${y}`);
  };
  const _flushDirty = () => {
    if (!_dirtyRegions.size) return;
    for (const region of _dirtyRegions) {
      const [x, y] = region.split(',').map(Number);
      const w = 1; // Mark single pixel as dirty
      const h = 1;
      const data = _maskCtx.getImageData(x, y, w, h);
      data.data.set(new Uint8ClampedArray([0, 0, 0, 0])); // Set to transparent
      _maskCtx.putImageData(data, x, y);
    }
    _dirtyRegions.clear();
  };
  const updateMaskOverlay = (colX, colY) => {
    if (!_maskCanvas || !_maskCtx || !state.imageData) return;
    const w = state.imageData.width;
    const h = state.imageData.height;
    if (!_maskData) {
      _maskData = new Uint8ClampedArray(w * h * 4);
    }
    if (state.paintedMap && state.startPosition) {
      const p = ((colY - state.startPosition.y) * w + (colX - state.startPosition.x)) * 4;
      if (p >= 0 && p < _maskData.length) {
        _maskData[p] = 0;
        _maskData[p + 1] = 0;
        _maskData[p + 2] = 0;
        _maskData[p + 3] = 150;
      } else {
        _maskData[p] = 0;
        _maskData[p + 1] = 0;
        _maskData[p + 2] = 0;
        _maskData[p + 3] = 0;
      }
    }
    if (_maskData) {
      _markDirty(colX, 0);
      _markDirty(colX, h - 1);
    }
  };
  const redrawMaskOverlay = () => {
    // Only flush the dirty region; full rebuild happens on size change
    _flushDirty();
  };
  const handlePaint = (e) => {
    // Suppress painting while panning if ((e.buttons & 4) === 4 || (e.buttons & 2) === 2 || allowPan) return;
    const {
      x,
      y
    } = mapClientToPixel(e.clientX, e.clientY);
    const w = baseCanvas.width,
      h = baseCanvas.height;
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const pixel = pixelData.get(x, y);
    if (!pixel) return;
    const colorId = pixel.color;
    if (state.tokenSource === "manual") {
      // Manual mode relies on the user painting a pixel to get a new token
      state.lastManualPixelTime = Date.now();
      // The event listener for painting handles the token capture
      console.log("Captured manual pixel paint, resolving token promise.");
    }
  };

  function updateOverlayPosition() {
    if (_overlayCanvas && state.startPosition) {
      const {
        x,
        y
      } = state.startPosition;
      _overlayCanvas.style.left = `${x}px`;
      _overlayCanvas.style.top = `${y}px`;
    }
  }

  function updateResizePreview() {
    if (!state.imageData || !state.imageData.processor || !_resizeBox) return;
    const proc = state.imageData.processor;
    const {
      width,
      height
    } = state.resizeSettings;
    proc.resize(width, height);
    proc.processImage().then(() => {
      _resizeBox.querySelector(".resize-preview-canvas").width = width;
      _resizeBox.querySelector(".resize-preview-canvas").height = height;
      const ctx = _resizeBox.querySelector(".resize-preview-canvas").getContext('2d');
      ctx.putImageData(new ImageData(proc.pixels, width, height), 0, 0);
    });
  }

  function showResizeDialog(processor) {
    if (_isResizing) return;
    _isResizing = true;
    _isDraggingSize = false;
    _originalSize.w = processor.canvas.width;
    _originalSize.h = processor.canvas.height;
    const currentScale = state.resizeSettings?.customScale || 1;
    const width = Math.round(_originalSize.w * currentScale);
    const height = Math.round(_originalSize.h * currentScale);
    state.resizeSettings = {
      width,
      height,
      ignoreTransparent: false,
      customScale: currentScale,
      lockRatio: true
    };
    if (!_resizeOverlay) {
      _resizeOverlay = Utils.createElement('div', {
        id: 'wplace-resize-overlay',
        class: 'resize-overlay'
      });
      document.body.appendChild(_resizeOverlay);
    }
    _resizeOverlay.style.display = 'block';
    _resizeBox = Utils.createElement('div', {
      id: 'wplace-resize-box',
      class: 'resize-container'
    },
      Utils.createElement('div', {
        class: 'resize-header'
      },
        Utils.createElement('h3', {}, Utils.t("resizeImage")),
        Utils.createElement('button', {
          class: 'close-btn',
          onClick: () => {
            _resizeBox.remove();
            _resizeOverlay.style.display = 'none';
            _isResizing = false;
          }
        }, '✕')
      ),
      Utils.createElement('div', {
        class: 'resize-content'
      },
        Utils.createElement('div', {
          class: 'resize-inputs'
        },
          Utils.createElement('div', {
            class: 'input-group'
          },
            Utils.createElement('label', {}, 'Width:'),
            Utils.createElement('input', {
              type: 'number',
              id: 'resizeWidth',
              value: width,
              min: 1
            })
          ),
          Utils.createElement('div', {
            class: 'input-group'
          },
            Utils.createElement('label', {}, 'Height:'),
            Utils.createElement('input', {
              type: 'number',
              id: 'resizeHeight',
              value: height,
              min: 1
            })
          ),
          Utils.createElement('div', {
            class: 'input-group'
          },
            Utils.createElement('label', {}, 'Scale:'),
            Utils.createElement('input', {
              type: 'range',
              id: 'resizeScale',
              min: 0.1,
              max: 2,
              step: 0.01,
              value: currentScale
            })
          ),
          Utils.createElement('div', {
            class: 'input-group checkbox-group'
          },
            Utils.createElement('input', {
              type: 'checkbox',
              id: 'resizeLockRatio',
              checked: state.resizeSettings.lockRatio
            }),
            Utils.createElement('label', {
              for: 'resizeLockRatio'
            }, 'Lock Aspect Ratio')
          )
        ),
        Utils.createElement('div', {
          class: 'resize-preview'
        },
          Utils.createElement('canvas', {
            class: 'resize-preview-canvas',
            style: 'border: 1px solid #333; image-rendering: pixelated;'
          })
        ),
        Utils.createElement('div', {
          class: 'resize-info'
        },
          Utils.createElement('p', {}, 'Original Size: ', Utils.createElement('span', {
            id: 'originalSizeInfo'
          }, `${_originalSize.w}x${_originalSize.h}`)),
          Utils.createElement('p', {}, 'New Size: ', Utils.createElement('span', {
            id: 'newSizeInfo'
          }, `${width}x${height}`)),
        )
      ),
      Utils.createElement('div', {
        class: 'resize-actions'
      },
        Utils.createElement('button', {
          id: 'applyResizeBtn',
          class: 'wplace-btn wplace-btn-primary'
        }, 'Apply'),
        Utils.createElement('button', {
          id: 'cancelResizeBtn',
          class: 'wplace-btn wplace-btn-secondary'
        }, 'Cancel')
      )
    );
    document.body.appendChild(_resizeBox);
    updateResizePreview();
    const widthInput = document.getElementById('resizeWidth');
    const heightInput = document.getElementById('resizeHeight');
    const scaleInput = document.getElementById('resizeScale');
    const lockRatio = document.getElementById('resizeLockRatio');
    const newSizeInfo = document.getElementById('newSizeInfo');
    const updatePreview = Utils.debounce(() => {
      _isDraggingSize = false;
      const w = parseInt(widthInput.value, 10);
      const h = parseInt(heightInput.value, 10);
      const s = parseFloat(scaleInput.value);
      state.resizeSettings.width = w;
      state.resizeSettings.height = h;
      state.resizeSettings.customScale = s;
      newSizeInfo.textContent = `${w}x${h}`;
      updateResizePreview();
    }, 200);
    widthInput.addEventListener('input', (e) => {
      _isDraggingSize = true;
      const w = parseInt(e.target.value, 10);
      if (lockRatio.checked) {
        heightInput.value = Math.round(w * _originalSize.h / _originalSize.w);
      }
      updatePreview();
    });
    heightInput.addEventListener('input', (e) => {
      _isDraggingSize = true;
      const h = parseInt(e.target.value, 10);
      if (lockRatio.checked) {
        widthInput.value = Math.round(h * _originalSize.w / _originalSize.h);
      }
      updatePreview();
    });
    scaleInput.addEventListener('input', (e) => {
      _isDraggingSize = true;
      const s = parseFloat(e.target.value);
      widthInput.value = Math.round(_originalSize.w * s);
      heightInput.value = Math.round(_originalSize.h * s);
      updatePreview();
    });
    lockRatio.addEventListener('change', (e) => {
      state.resizeSettings.lockRatio = e.target.checked;
    });
    document.getElementById('applyResizeBtn').addEventListener('click', () => {
      const w = parseInt(widthInput.value, 10);
      const h = parseInt(heightInput.value, 10);
      state.imageData.processor.resize(w, h);
      state.imageData.processor.processImage().then(() => {
        state.imageData.pixels = state.imageData.processor.pixels;
        state.totalPixels = state.imageData.processor.totalValidPixels;
        state.paintedPixels = 0;
        state.paintedMap = new Array(h).fill(null).map(() => new Array(w).fill(false));
        updateProgressBar();
        updateStats();
        _resizeBox.remove();
        _resizeOverlay.style.display = 'none';
        _isResizing = false;
        Utils.showAlert(Utils.t("resizeSuccess", {
          width: w,
          height: h
        }), "success");
        createOverlayCanvas();
        updateOverlay();
      });
    });
    document.getElementById('cancelResizeBtn').addEventListener('click', () => {
      _resizeBox.remove();
      _resizeOverlay.style.display = 'none';
      _isResizing = false;
    });
  }

  function toggleOverlay() {
    const overlay = document.getElementById("wplace-image-overlay");
    if (!overlay) return;
    overlay.style.display = overlay.style.display === "block" ? "none" : "block";
    updateOverlay();
    const button = document.getElementById("toggleOverlayBtn");
    if (button) {
      if (overlay.style.display === "block") {
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
      } else {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
      }
    }
  }

  function updateOverlay() {
    const overlay = document.getElementById("wplace-image-overlay");
    if (!overlay || overlay.style.display === "none") return;
    if (!state.imageData || !state.imageData.processor) return;
    const {
      width,
      height
    } = state.imageData;
    const proc = state.imageData.processor;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;
    if (state.ditheringEnabled) {
      // Re-run the dither process to get the latest dithered image
      proc.processImage().then(() => {
        const imageData = new ImageData(proc.pixels, width, height);
        ctx.putImageData(imageData, 0, 0);
        updateOverlayPosition();
      });
    } else {
      // No dithering, just use the stored pixels
      const imageData = new ImageData(state.imageData.pixels, width, height);
      ctx.putImageData(imageData, 0, 0);
      updateOverlayPosition();
    }
  }

  function updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
      const progress = state.totalPixels > 0 ? (state.paintedPixels / state.totalPixels) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }
  }

  function addEventListeners() {
    const container = document.getElementById("wplace-image-bot-container")
    const uploadBtn = document.getElementById("uploadBtn")
    const selectPosBtn = document.getElementById("selectPosBtn")
    const startBtn = document.getElementById("startBtn")
    const stopBtn = document.getElementById("stopBtn")
    const toggleOverlayBtn = document.getElementById("toggleOverlayBtn")
    const resizeBtn = document.getElementById("resizeBtn")
    const statsBtn = document.getElementById("statsBtn")
    const closeStatsBtn = document.getElementById("closeStatsBtn")
    const settingsBtn = document.getElementById("settingsBtn")
    const closeSettingsBtn = document.getElementById("closeSettingsBtn")
    const minimizeBtn = document.getElementById("minimizeBtn")
    const saveBtn = document.getElementById("saveBtn")
    const loadBtn = document.getElementById("loadBtn")
    const saveToFileBtn = document.getElementById("saveToFileBtn")
    const loadFromFileBtn = document.getElementById("loadFromFileBtn")
    const compactBtn = document.getElementById("compactBtn")
    const refreshChargesBtn = document.getElementById("refreshChargesBtn")

    // Dragging the main UI
    let isDragging = false;
    let offsetX, offsetY;
    const header = container.querySelector(".wplace-header")
    header.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - container.offsetLeft;
      offsetY = e.clientY - container.offsetTop;
      container.style.cursor = "grabbing";
    });
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        container.style.left = `${e.clientX - offsetX}px`;
        container.style.top = `${e.clientY - offsetY}px`;
      }
    });
    document.addEventListener("mouseup", () => {
      isDragging = false;
      container.style.cursor = "grab";
    });

    if (uploadBtn) {
      uploadBtn.addEventListener("click", () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.onchange = async (e) => {
          const file = e.target.files[0]
          if (!file) return;
          updateUI("loadingImage", "info")
          try {
            const processor = await new ImageProcessor(file).load()
            state.imageData = {
              width: processor.canvas.width,
              height: processor.canvas.height,
              pixels: processor.getImageData(),
              totalPixels: 0,
              processor: processor, // Store processor instance
            }
            state.originalImage = URL.createObjectURL(file); // Store original for resize
            // We need to re-run processing after any image modification
            await state.imageData.processor.processImage()
            state.imageData.pixels = state.imageData.processor.pixels
            state.totalPixels = state.imageData.processor.totalValidPixels
            state.paintedPixels = 0
            state.paintedMap = new Array(state.imageData.height).fill(null).map(() => new Array(state.imageData.width).fill(false))
            const selectPosBtn = document.getElementById("selectPosBtn")
            if (selectPosBtn) selectPosBtn.disabled = false
            const toggleOverlayBtn = document.getElementById("toggleOverlayBtn")
            toggleOverlayBtn.disabled = false
            toggleOverlayBtn.classList.remove('active');
            toggleOverlayBtn.setAttribute('aria-pressed', 'false');
            // Only enable resize button if colors have also been captured
            if (state.colorsChecked) {
              resizeBtn.disabled = false;
            }
            saveBtn.disabled = false
            if (state.startPosition) {
              startBtn.disabled = false
            }
            updateStats()
            updateDataButtons()
            updateUI("imageLoaded", "success", {
              count: state.totalPixels
            })
            createOverlayCanvas()
          } catch (e) {
            console.error("Error loading image:", e)
            updateUI("imageError", "error")
          }
        }
        input.click()
      })
    }

    if (resizeBtn) {
      resizeBtn.addEventListener("click", () => {
        if (state.imageLoaded && state.imageData.processor && state.colorsChecked) {
          showResizeDialog(state.imageData.processor)
        } else if (!state.colorsChecked) {
          Utils.showAlert("Please upload an image first to capture available colors", "warning")
        }
      })
    }

    if (selectPosBtn) {
      selectPosBtn.addEventListener("click", async () => {
        if (state.selectingPosition) return
        state.selectingPosition = true
        state.startPosition = null
        state.region = null
        startBtn.disabled = true
        Utils.showAlert(Utils.t("selectPositionAlert"), "info", 60000)
        updateUI("waitingPosition", "info")
        let listenerAdded = false
        const paintListener = async (event) => {
          if (!state.selectingPosition) return
          if (event.ctrlKey || event.metaKey || event.shiftKey) return; // Prevent interference with other functions
          const {
            x,
            y
          } = {
            x: event.clientX,
            y: event.clientY
          };
          const target = event.target;
          if (target && target.tagName === 'CANVAS' && target.id === 'r-canvas') {
            state.startPosition = {
              x: x,
              y: y
            }
            console.log("Position set to:", state.startPosition)
            Utils.showAlert(Utils.t("positionSet"), "success")
            updateUI("positionSet", "success")
            document.removeEventListener("mousedown", paintListener)
            startBtn.disabled = false
            state.selectingPosition = false
            createOverlayCanvas()
            updateOverlayPosition()
            // Toggle overlay on once position is selected
            toggleOverlayBtn.classList.add('active');
            toggleOverlayBtn.setAttribute('aria-pressed', 'true');
            document.getElementById("wplace-image-overlay").style.display = "block"
          }
        }
        document.addEventListener("mousedown", paintListener)
        // Add a timeout to stop waiting
        setTimeout(() => {
          if (state.selectingPosition) {
            state.selectingPosition = false
            updateUI("positionTimeout", "error")
            document.removeEventListener("mousedown", paintListener)
          }
        }, 60000) // 1 minute timeout
      })
    }
    if (startBtn) startBtn.addEventListener("click", startPainting)
    if (stopBtn) stopBtn.addEventListener("click", stopPainting)
    if (toggleOverlayBtn) toggleOverlayBtn.addEventListener("click", toggleOverlay)
    if (statsBtn) {
      statsBtn.addEventListener("click", () => {
        const statsContainer = document.getElementById("wplace-stats-container")
        statsContainer.style.display = statsContainer.style.display === "block" ? "none" : "block"
        state.isStatsWindowOpen = statsContainer.style.display === "block"
        if (state.isStatsWindowOpen) {
          updateStats()
        }
      })
    }
    if (closeStatsBtn) closeStatsBtn.addEventListener("click", () => {
      const statsContainer = document.getElementById("wplace-stats-container")
      statsContainer.style.display = "none"
      state.isStatsWindowOpen = false
    })
    if (settingsBtn) {
      settingsBtn.addEventListener("click", () => {
        const settingsContainer = document.getElementById("wplace-settings-container")
        settingsContainer.style.display = settingsContainer.style.display === "block" ? "none" : "block"
        state.isSettingsWindowOpen = settingsContainer.style.display === "block"
      })
    }
    if (closeSettingsBtn) closeSettingsBtn.addEventListener("click", () => {
      const settingsContainer = document.getElementById("wplace-settings-container")
      settingsContainer.style.display = "none"
      state.isSettingsWindowOpen = false
    })
    if (minimizeBtn) {
      minimizeBtn.addEventListener("click", () => {
        const container = document.getElementById("wplace-image-bot-container")
        if (state.minimized) {
          container.classList.remove('minimized')
          container.style.width = ''
          container.style.height = ''
          minimizeBtn.innerHTML = '<i class="fas fa-minus"></i>'
        } else {
          container.classList.add('minimized')
          minimizeBtn.innerHTML = '<i class="fas fa-expand"></i>'
        }
        state.minimized = !state.minimized
        saveBotSettings()
      })
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        if (Utils.saveProgress()) {
          Utils.showAlert(Utils.t("autoSaved"), "success")
        } else {
          Utils.showAlert(Utils.t("paintingError"), "error")
        }
      })
    }
    if (loadBtn) {
      loadBtn.addEventListener("click", () => {
        const savedData = Utils.loadProgress()
        if (savedData) {
          if (Utils.restoreProgress(savedData)) {
            updateUI("dataLoaded", "success")
            updateControls(true)
            updateProgressBar()
            updateStats()
            if (state.startPosition && state.imageLoaded) {
              createOverlayCanvas()
              updateOverlayPosition()
              document.getElementById("wplace-image-overlay").style.display = "block"
              document.getElementById("toggleOverlayBtn").classList.add('active');
              document.getElementById("toggleOverlayBtn").setAttribute('aria-pressed', 'true');
            }
          }
        } else {
          Utils.showAlert(Utils.t("noSavedData"), "error")
        }
      })
    }
    if (saveToFileBtn) {
      saveToFileBtn.addEventListener("click", () => {
        const progressData = Utils.loadProgress()
        if (progressData) {
          if (Utils.saveDataToFile(progressData, "wplace_progress.json")) {
            Utils.showAlert(Utils.t("fileSaved"), "success")
          } else {
            Utils.showAlert(Utils.t("fileError"), "error")
          }
        } else {
          Utils.showAlert(Utils.t("noSavedData"), "error")
        }
      })
    }
    if (loadFromFileBtn) {
      loadFromFileBtn.addEventListener("click", async () => {
        try {
          const data = await Utils.loadDataFromFile()
          if (data) {
            // First migrate old file formats to newest
            let migrated = Utils.migrateProgressToV21(data);
            if (Utils.restoreProgress(migrated)) {
              updateUI("fileLoaded", "success")
              updateControls(true)
              updateProgressBar()
              updateStats()
              if (state.startPosition && state.imageLoaded) {
                createOverlayCanvas()
                updateOverlayPosition()
                document.getElementById("wplace-image-overlay").style.display = "block"
                document.getElementById("toggleOverlayBtn").classList.add('active');
                document.getElementById("toggleOverlayBtn").setAttribute('aria-pressed', 'true');
              }
            }
          }
        } catch (e) {
          Utils.showAlert(e.message, "error")
        }
      })
    }
    if (compactBtn) {
      compactBtn.addEventListener("click", () => {
        const container = document.getElementById("wplace-image-bot-container")
        state.compactMode = !state.compactMode
        if (state.compactMode) {
          container.classList.add('compact-mode')
        } else {
          container.classList.remove('compact-mode')
        }
        updateStats();
      })
    }
    if (refreshChargesBtn) {
      refreshChargesBtn.addEventListener("click", async () => {
        await Utils.getCharges()
        updateStats()
      })
    }

    // Settings listeners
    const applySettingsBtn = document.getElementById('applySettingsBtn');
    if (applySettingsBtn) applySettingsBtn.addEventListener('click', () => {
      const speedSlider = document.getElementById('paintingSpeedSlider');
      const enableSpeedToggle = document.getElementById('enableSpeedToggle');
      const batchModeSelect = document.getElementById('batchModeSelect');
      const randomBatchMin = document.getElementById('randomBatchMin');
      const randomBatchMax = document.getElementById('randomBatchMax');
      const cooldownSlider = document.getElementById('cooldownSlider');
      const tokenSourceSelect = document.getElementById('tokenSourceSelect');
      const overlayOpacitySlider = document.getElementById('overlayOpacitySlider');
      const enableBlueMarbleToggle = document.getElementById('enableBlueMarbleToggle');
      const ditherToggle = document.getElementById('ditherToggle');
      const paintWhitePixelsToggle = document.getElementById('paintWhitePixelsToggle');
      const languageSelect = document.getElementById('languageSelect');
      const themeSelect = document.getElementById('themeSelect');
      const colorAlgorithmSelect = document.getElementById('colorAlgorithmSelect');
      const enableChromaPenaltyToggle = document.getElementById('enableChromaPenaltyToggle');
      const chromaSlider = document.getElementById('chromaSlider');
      const transparencyThresholdInput = document.getElementById('transparencyThresholdInput');
      const whiteThresholdInput = document.getElementById('whiteThresholdInput');

      if (speedSlider) state.paintingSpeed = parseInt(speedSlider.value, 10);
      if (enableSpeedToggle) state.paintingSpeedEnabled = enableSpeedToggle.checked;
      if (batchModeSelect) state.batchMode = batchModeSelect.value;
      if (randomBatchMin) state.randomBatchMin = parseInt(randomBatchMin.value, 10);
      if (randomBatchMax) state.randomBatchMax = parseInt(randomBatchMax.value, 10);
      if (cooldownSlider) state.cooldownChargeThreshold = parseInt(cooldownSlider.value, 10);
      if (tokenSourceSelect) state.tokenSource = tokenSourceSelect.value;
      if (overlayOpacitySlider) state.overlayOpacity = parseFloat(overlayOpacitySlider.value);
      if (enableBlueMarbleToggle) state.blueMarbleEnabled = enableBlueMarbleToggle.checked;
      if (ditherToggle) state.ditheringEnabled = ditherToggle.checked;
      if (paintWhitePixelsToggle) state.paintWhitePixels = paintWhitePixelsToggle.checked;
      if (languageSelect) state.language = languageSelect.value;
      if (themeSelect) switchTheme(themeSelect.value);
      if (colorAlgorithmSelect) state.colorMatchingAlgorithm = colorAlgorithmSelect.value;
      if (enableChromaPenaltyToggle) state.enableChromaPenalty = enableChromaPenaltyToggle.checked;
      if (chromaSlider) state.chromaPenaltyWeight = parseFloat(chromaSlider.value);
      if (transparencyThresholdInput) state.customTransparencyThreshold = parseInt(transparencyThresholdInput.value, 10);
      if (whiteThresholdInput) state.customWhiteThreshold = parseInt(whiteThresholdInput.value, 10);
      saveBotSettings();
      Utils.showAlert(Utils.t("settingsSaved"), "success");
      updateStats();
      if (state.imageData && state.imageData.processor) {
        state.imageData.processor.processImage().then(() => {
          state.imageData.pixels = state.imageData.processor.pixels;
          updateOverlay();
        });
      }
    });

    const ditherToggle = document.getElementById('ditherToggle');
    if (ditherToggle) ditherToggle.addEventListener('change', e => {
      state.ditheringEnabled = e.target.checked;
      saveBotSettings();
      _updateResizePreview();
    });

    const resetBtn = document.getElementById('resetColorSettingsBtn');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      state.colorMatchingAlgorithm = 'lab';
      state.enableChromaPenalty = true;
      state.chromaPenaltyWeight = 0.15;
      state.customTransparencyThreshold = CONFIG.TRANSPARENCY_THRESHOLD = 100;
      state.customWhiteThreshold = CONFIG.WHITE_THRESHOLD = 250;
      saveBotSettings();
      const a = document.getElementById('colorAlgorithmSelect');
      if (a) a.value = 'lab';
      const ct = document.getElementById('enableChromaPenaltyToggle');
      if (ct) ct.checked = true;
      if (chromaSlider) chromaSlider.value = 0.15;
      if (chromaValue) chromaValue.textContent = '0.15';
      if (transInput) transInput.value = 100;
      if (whiteInput) whiteInput.value = 250;
      _updateResizePreview();
      Utils.showAlert('Advanced color settings reset.', 'success');
    });

    const saveToFileBtn = document.getElementById("saveToFileBtn");
    const loadFromFileBtn = document.getElementById("loadFromFileBtn");

    if (saveToFileBtn) saveToFileBtn.addEventListener('click', saveProgressToFile);
    if (loadFromFileBtn) loadFromFileBtn.addEventListener('click', loadProgressFromFile);

    // Event listener for manual pixel placement to get token
    window.addEventListener('message', event => {
      if (event.data.source === 'auto-image-bot' && event.data.type === 'token_found') {
        const token = event.data.token;
        if (state.tokenSource === "manual" && !state.turnstileToken) {
          console.log("Token captured from manual pixel placement.");
          state.turnstileToken = token;
          _resolveToken(token);
          state.reinitRequired = false;
        }
      }
    });

  }

  // --- Main Execution ---
  createUI()
})();
