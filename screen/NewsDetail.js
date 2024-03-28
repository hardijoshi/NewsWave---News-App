import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';

export default function NewsDetail({ route }) {
  const { article } = route.params;

  const openFullArticle = () => {
    Linking.openURL(article.url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {article.urlToImage ? (
          <Image source={{ uri: article.urlToImage }} style={styles.articleImage} />
        ) : (
          <Image source={require('../assets/Images/NewsWave.png')} style={styles.articleImage} />
        )}
      </View>
      <View style={styles.articleInfo}>
      
        
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleSource}>{article.source.name}</Text>
        <Text style={styles.articleSource}>Author: {article.author}</Text>
        <Text style={styles.articleDescription}>
          {article.description}{' '}
          <Text style={styles.readMoreButton} onPress={openFullArticle}>Read More</Text>
        </Text>
        
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F8',
  },
  imageContainer: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
    
  },
  articleImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  articleInfo: {
    padding: 10,
    marginTop: 15
  },
  articleTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    textAlign: 'justify',
   
  },
  articleSource: {
    fontSize: 12,
    color: '#888',
 
    marginHorizontal: 5
  },
  articleDescription: {
    fontSize: 16,
    lineHeight: 28,
    color: '#000',
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'justify',
    margin: 5
  },
  articleContent: {
    fontSize: 14,
    lineHeight: 24,
    color: '#000',
    textAlign: ''
  },
  readMoreButton: {
    fontSize: 12,
    color: '#4C6793', 
    textDecorationLine: 'underline',
  },
});
