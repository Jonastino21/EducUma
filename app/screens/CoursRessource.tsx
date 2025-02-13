import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { ChevronDown, ChevronUp, Search, Download, FileText, BookOpen } from 'lucide-react-native';

// Exemple de données (à remplacer par vos données réelles)
const resourcesData = [
  {
    subject: 'Programmation',
    chapters: [
      {
        name: 'Chapitre 1: Base Langage C++',
        documents: [
          { id: '1', title: 'Cours Langage C', format: 'PDF', version: '1.2', url: 'url/math/algebra.pdf' },
          { id: '2', title: 'Exercices', format: 'DOC', version: '1.0', url: 'url/math/exercises.doc' },
        ]
      },
      {
        name: 'Chapitre 2: Programmation Orienté Objet',
        documents: [
          { id: '3', title: 'Support de cours POO', format: 'PPT', version: '2.1', url: 'url/math/geometry.ppt' },
        ]
      }
    ]
  },
  {
    subject: 'Marketing',
    chapters: [
      {
        name: 'Chapitre 1: Marketing et entreprise',
        documents: [
          { id: '4', title: 'Introduction', format: 'PDF', version: '1.0', url: 'url/physics/mechanics.pdf' },
        ]
      }
    ]
  }
];

const ResourcesSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);

  // Fonction de recherche
  const filteredResources = resourcesData.map(subject => ({
    ...subject,
    chapters: subject.chapters.map(chapter => ({
      ...chapter,
      documents: chapter.documents.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(chapter => chapter.documents.length > 0)
  })).filter(subject => subject.chapters.length > 0);

  // Gestion du téléchargement
  const handleDownload = (document) => {
    // Implémenter la logique de téléchargement ici
    console.log(`Téléchargement de ${document.title}`);
  };

  // Fonction pour obtenir la couleur selon le format
  const getFormatColor = (format) => {
    switch (format.toLowerCase()) {
      case 'pdf': return 'text-red-500';
      case 'doc': return 'text-blue-500';
      case 'ppt': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const renderDocument = ({ item }) => (
    <View className="flex-row items-center justify-between p-3 bg-white rounded-lg mb-2 shadow-sm">
      <View className="flex-1">
        <Text className="text-base font-medium">{item.title}</Text>
        <View className="flex-row items-center mt-1">
          <Text className={`text-sm ${getFormatColor(item.format)}`}>{item.format}</Text>
          <Text className="text-sm text-gray-500 ml-2">v{item.version}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleDownload(item)}
        className="bg-blue-500 p-2 rounded-full"
      >
        <Download size={20} color="white" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1">
      {/* Barre de recherche */}
      <View className="mb-4 flex-row items-center bg-white rounded-lg p-2 shadow-sm">
        <Search size={20} color="#9CA3AF" strokeWidth={2} />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Rechercher un document..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Liste des ressources */}
      <ScrollView className="flex-1">
        {filteredResources.map((subject) => (
          <View key={subject.subject} className="mb-4">
            {/* En-tête de la matière */}
            <TouchableOpacity
              onPress={() => setExpandedSubject(
                expandedSubject === subject.subject ? null : subject.subject
              )}
              className="flex-row items-center justify-between bg-gray-100 p-3 rounded-t-lg"
            >
              <View className="flex-row items-center">
                <BookOpen size={20} color="#4B5563" strokeWidth={2} />
                <Text className="text-lg font-bold ml-2">{subject.subject}</Text>
              </View>
              {expandedSubject === subject.subject ? 
                <ChevronUp size={20} color="#4B5563" strokeWidth={2} /> :
                <ChevronDown size={20} color="#4B5563" strokeWidth={2} />
              }
            </TouchableOpacity>

            {/* Chapitres */}
            {expandedSubject === subject.subject && subject.chapters.map((chapter) => (
              <View key={chapter.name} className="ml-4 mt-2">
                <TouchableOpacity
                  onPress={() => setExpandedChapter(
                    expandedChapter === chapter.name ? null : chapter.name
                  )}
                //   className="flex-row items-center justify-between p-2"
                >
                  <View className="flex-row items-center">
                    <FileText size={18} color="#4B5563" strokeWidth={2} />
                    <Text className="text-base font-medium ml-2">{chapter.name}</Text>
                  </View>
                  {expandedChapter === chapter.name ?
                    <ChevronUp size={18} color="#4B5563" strokeWidth={2} /> :
                    <ChevronDown size={18} color="#4B5563" strokeWidth={2} />
                  }
                </TouchableOpacity>

                {/* Documents */}
                {expandedChapter === chapter.name && (
                  <View className="ml-4 mt-2">
                    <FlatList
                      data={chapter.documents}
                      renderItem={renderDocument}
                      keyExtractor={item => item.id}
                      scrollEnabled={false}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ResourcesSection;