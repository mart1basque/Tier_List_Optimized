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
    deleteTier: 'Delete tier',
    addTier: 'Add Tier',
    charactersPool: 'Characters Pool',
    unknownCharacters: 'Unknown Characters',
    noUnknownCharacters: 'No unknown characters',
    orderWebsite: 'Your custom website here',
    pokemonName: 'Pokémon',
    pokemonDescription: 'Create tier lists of your favorite Pokémon by generation',
    narutoName: 'Naruto',
    narutoDescription: 'Rank ninjas from the Naruto universe by arc or series',
    demonSlayerName: 'Demon Slayer',
    demonSlayerDescription: 'Create tier lists of characters from each season of Demon Slayer',
    leagueOfLegendsName: 'League of Legends',
    leagueOfLegendsDescription: 'Rank your favorite champions by class using Data Dragon',
    onepieceName: 'One Piece',
    onepieceDescription: 'Create tier lists of characters from One Piece using Jikan',
    temtemName: 'Temtem',
    temtemDescription: 'Rank Temtem creatures by type or check their Luma form'
  },
  fr: {
    createBeautiful: 'Commence ta tier liste en choisissant ton univers préférére',
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
    deleteTier: 'Supprimer le tier',
    addTier: 'Ajouter un tier',
    charactersPool: 'Réserve de personnages',
    unknownCharacters: 'Personnages inconnus',
    noUnknownCharacters: 'Aucun personnage inconnu',
    orderWebsite: 'Ton site web sur-mesure ici',
    pokemonName: 'Pokémon',
    pokemonDescription: 'Créez des tier lists de vos Pokémon préférés par génération',
    narutoName: 'Naruto',
    narutoDescription: 'Classez les ninjas de l\'univers Naruto par arc ou série',
    demonSlayerName: 'Demon Slayer',
    demonSlayerDescription: 'Créez des tier lists des personnages de chaque saison de Demon Slayer',
    leagueOfLegendsName: 'League of Legends',
    leagueOfLegendsDescription: 'Classez vos champions préférés par classe en utilisant Data Dragon',
    onepieceName: 'One Piece',
    onepieceDescription: 'Créez des tier lists des personnages de One Piece avec Jikan',
    temtemName: 'Temtem',
    temtemDescription: 'Classez les créatures Temtem par type ou vérifiez leur forme Luma'
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
    deleteTier: 'Eliminar tier',
    addTier: 'Agregar tier',
    charactersPool: 'Reservorio de personajes',
    unknownCharacters: 'Personajes desconocidos',
    noUnknownCharacters: 'No hay personajes desconocidos',
    orderWebsite: 'Tu sitio web personalizado aquí',
    pokemonName: 'Pokémon',
    pokemonDescription: 'Crea listas de niveles de tus Pokémon favoritos por generación',
    narutoName: 'Naruto',
    narutoDescription: 'Clasifica a los ninjas del universo de Naruto por arco o serie',
    demonSlayerName: 'Demon Slayer',
    demonSlayerDescription: 'Crea listas de niveles de personajes de cada temporada de Demon Slayer',
    leagueOfLegendsName: 'League of Legends',
    leagueOfLegendsDescription: 'Clasifica tus campeones favoritos por clase usando Data Dragon',
    onepieceName: 'One Piece',
    onepieceDescription: 'Crea listas de niveles de personajes de One Piece usando Jikan',
    temtemName: 'Temtem',
    temtemDescription: 'Clasifica a las criaturas Temtem por tipo o revisa su forma Luma'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => {},
  t: key => translations['fr'][key] || key
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('language')) {
      return localStorage.getItem('language') as Language;
    }
    return 'fr';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const t = useCallback((key: string) => translations[language][key] || translations['fr'][key] || key, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

