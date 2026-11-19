export type Language = 'en' | 'ar';

export const translations = {
  en: {
    greeting: 'YOUR IDEAS, IN MOTION', brand: 'MINDORA', tagline: 'Turn what you imagine into\nsomething people can see.',
    getStarted: 'Get started', language: 'العربية', createTitle: 'What should we explain?',
    createSubtitle: 'Start with a thought. We’ll shape it into a visual story.', placeholder: 'Type or paste your idea here…',
    example: 'Try: How does the human brain learn?', continue: 'Continue', chooseStyle: 'Choose your visual style',
    styleSubtitle: 'Pick the look that brings your idea to life.', animated: 'Animated', animatedDesc: 'Expressive illustrations & motion', realistic: 'Realistic', realisticDesc: 'A cinematic, lifelike look',
    preview: 'Your story preview', previewDesc: 'Here’s how your video project is shaping up.', yourText: 'YOUR SCRIPT', visualStyle: 'VISUAL STYLE', edit: 'Edit idea', createAnother: 'Create another',
    demo: 'PREVIEW CONCEPT', demoNote: 'This is a project preview. Video generation will be added in a future phase.', back: 'Back', empty: 'Add a little text to continue.',
    mins: 'A new way to explain anything', step: '01 / 03',
  },
  ar: {
    greeting: 'أفكارك، تتحول إلى قصة', brand: 'MINDORA', tagline: 'حوّل ما تتخيله إلى\nشيء يستطيع الجميع رؤيته.',
    getStarted: 'ابدأ الآن', language: 'English', createTitle: 'ما الموضوع الذي تريد شرحه؟',
    createSubtitle: 'ابدأ بفكرة، وسنساعدك على تحويلها إلى قصة مرئية.', placeholder: 'اكتب فكرتك أو الصق النص هنا…',
    example: 'جرّب: كيف يتعلم الدماغ البشري؟', continue: 'متابعة', chooseStyle: 'اختر أسلوب الفيديو',
    styleSubtitle: 'اختر المظهر الذي يناسب فكرتك.', animated: 'رسوم متحركة', animatedDesc: 'رسوم توضيحية وحركة إبداعية', realistic: 'واقعي', realisticDesc: 'مظهر سينمائي أقرب للحقيقة',
    preview: 'معاينة قصتك', previewDesc: 'هذه نظرة أولية على مشروع الفيديو.', yourText: 'النص الخاص بك', visualStyle: 'أسلوب العرض', edit: 'تعديل الفكرة', createAnother: 'إنشاء فكرة أخرى',
    demo: 'معاينة تجريبية', demoNote: 'هذه معاينة للمشروع فقط. ستُضاف ميزة توليد الفيديو في مرحلة لاحقة.', back: 'رجوع', empty: 'أضف بعض النص للمتابعة.',
    mins: 'طريقة جديدة لشرح أي شيء', step: '٠١ / ٠٣',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export const isRTL = (language: Language) => language === 'ar';
