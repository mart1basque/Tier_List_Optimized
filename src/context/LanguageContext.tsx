import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type Language = 'en' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    createBeautiful: 'Create beautiful tier lists for your favorite anime universes',
    selectPokemonLanguage: 'Select Pokémon Language',
    chooseLanguage: 'Choose language',
    english: 'English',
    french: 'Français',
    spanish: 'Español',
    selectTemtemVariant: 'Select Temtem Variant',
    chooseVariant: 'Choose variant',
    normal: 'Normal',
    luma: 'Luma',
    backToHome: 'Back to Home',
    customizeYour: 'Customize Your',
    tierList: 'Tier List',
    selectWhich: 'Select which',
    youWant: 'you want to include in your tier list:',
    pleaseSelectLanguage: 'Please select a language first',
    pleaseSelectVariant: 'Please select a variant first',
    pleaseSelectOption: 'Please select at least one option to continue',
    continue: 'Continue',
    addCustomCharacter: 'Add Custom Character',
    characterName: 'Character Name',
    enterCharacterName: 'Enter character name',
    addToTierList: 'Add to Tier List',
    cancel: 'Cancel',
    dragDrop: 'Drag & drop an image, or',
    browse: 'browse',
    fileSize: 'PNG, JPG or GIF up to 5MB',
    exportShare: 'Export & Share',
    saveAsImage: 'Save as Image',
    exportJson: 'Export JSON',
    copyShareLink: 'Copy Share Link',
    linkCopied: 'Link Copied!',
    backToFilters: 'Back to Filters',
    dragCharactersHere: 'Drag characters here',
    save: 'Save',
    editTier: 'Edit tier',
    deleteTier: 'Delete tier'
  },
  fr: {
    createBeautiful: 'Créez de magnifiques tier lists pour vos univers d\'anime préférés',
    selectPokemonLanguage: 'Sélectionnez la langue des Pokémon',
    chooseLanguage: 'Choisissez la langue',
    english: 'Anglais',
    french: 'Français',
    spanish: 'Espagnol',
    selectTemtemVariant: 'Sélectionnez la variante Temtem',
    chooseVariant: 'Choisissez la variante',
    normal: 'Normal',
    luma: 'Luma',
    backToHome: 'Retour à l\'accueil',
    customizeYour: 'Personnalisez votre',
    tierList: 'Tier List',
    selectWhich: 'Sélectionnez les',
    youWant: 'que vous souhaitez inclure dans votre tier list :',
    pleaseSelectLanguage: 'Veuillez d\'abord choisir une langue',
    pleaseSelectVariant: 'Veuillez d\'abord choisir une variante',
    pleaseSelectOption: 'Veuillez sélectionner au moins une option pour continuer',
    continue: 'Continuer',
    addCustomCharacter: 'Ajouter un personnage personnalisé',
    characterName: 'Nom du personnage',
    enterCharacterName: 'Entrez le nom du personnage',
    addToTierList: 'Ajouter à la tier list',
    cancel: 'Annuler',
    dragDrop: 'Glissez-déposez une image ou',
    browse: 'parcourez',
    fileSize: 'PNG, JPG ou GIF jusqu\'à 5 Mo',
    exportShare: 'Exporter & Partager',
    saveAsImage: 'Enregistrer en image',
    exportJson: 'Exporter JSON',
    copyShareLink: 'Copier le lien de partage',
    linkCopied: 'Lien copié !',
    backToFilters: 'Retour aux filtres',
    dragCharactersHere: 'Glissez les personnages ici',
    save: 'Enregistrer',
    editTier: 'Modifier le tier',
    deleteTier: 'Supprimer le tier'
  },
  es: {
    createBeautiful: 'Crea listas de niveles para tus universos de anime favoritos',
    selectPokemonLanguage: 'Selecciona el idioma de Pokémon',
    chooseLanguage: 'Elige el idioma',
    english: 'Inglés',
    french: 'Francés',
    spanish: 'Español',
    selectTemtemVariant: 'Selecciona la variante de Temtem',
    chooseVariant: 'Elige la variante',
    normal: 'Normal',
    luma: 'Luma',
    backToHome: 'Volver al inicio',
    customizeYour: 'Personaliza tu',
    tierList: 'Lista de niveles',
    selectWhich: 'Selecciona las',
    youWant: 'que quieres incluir en tu lista:',
    pleaseSelectLanguage: 'Por favor, selecciona primero un idioma',
    pleaseSelectVariant: 'Por favor, selecciona primero una variante',
    pleaseSelectOption: 'Por favor, selecciona al menos una opción para continuar',
    continue: 'Continuar',
    addCustomCharacter: 'Agregar personaje personalizado',
    characterName: 'Nombre del personaje',
    enterCharacterName: 'Ingresa el nombre del personaje',
    addToTierList: 'Agregar a la lista',
    cancel: 'Cancelar',
    dragDrop: 'Arrastra y suelta una imagen o',
    browse: 'buscar',
    fileSize: 'PNG, JPG o GIF hasta 5MB',
    exportShare: 'Exportar y Compartir',
    saveAsImage: 'Guardar como imagen',
    exportJson: 'Exportar JSON',
    copyShareLink: 'Copiar enlace para compartir',
    linkCopied: '¡Enlace copiado!',
    backToFilters: 'Volver a los filtros',
    dragCharactersHere: 'Arrastra los personajes aquí',
    save: 'Guardar',
    editTier: 'Editar tier',
    deleteTier: 'Eliminar tier'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: key => translations['en'][key] || key
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('language') as Language) || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = useCallback((key: string) => translations[language][key] || translations['en'][key] || key, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

