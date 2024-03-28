import React,{useState,useEffect} from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const SearchResult = ({ route,navigation }) => {
  const { searchResult, searchQuery } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchResult) {
      setIsLoading(false);
    }
  }, [searchResult]);

  const SkeletonLoader = () => {
    const [isShimmering, setIsShimmering] = useState(true);

    useEffect(() => {
      const shimmerInterval = setInterval(() => {
        setIsShimmering((prevIsShimmering) => !prevIsShimmering);
      }, 200);
      return () => clearInterval(shimmerInterval);
    }, []);

    return (
      <View style={styles.skeletonContainer}>
        <ShimmerPlaceholder
          autoRun={false}
          visible={isShimmering}
          style={styles.skeletonHeader}
        />
        <ShimmerPlaceholder
          autoRun={false}
          visible={isShimmering}
          style={styles.skeletonSearch}
        />
        <ShimmerPlaceholder
          autoRun={false}
          visible={isShimmering}
          style={styles.skeletonCategories}
        />
        <ShimmerPlaceholder
          autoRun={false}
          visible={isShimmering}
          style={styles.skeletonHeadlines}
        />
        <ScrollView>
          {[...Array(5).keys()].map((index) => (
            <View key={index} style={styles.skeletonArticleContainer}>
              <ShimmerPlaceholder
                autoRun={false}
                visible={isShimmering}
                style={styles.skeletonArticleImage}
              />
              <ShimmerPlaceholder
                autoRun={false}
                visible={isShimmering}
                style={styles.skeletonArticleText}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {!isLoading ? (
        <>
          <View style={styles.header}>
            <Image source={require('../assets/Images/NewsWaveLogo.png')} style={styles.img}/>
            <Text style={styles.headerText}>News Wave</Text>
            <FontAwesome5 name="code" size={20} color="#000" solid style={styles.codeIcon} />
      </View>
      <View style={styles.search}>
        <Text style={styles.searchtxt}>Search results for: {searchQuery}</Text>
      </View>
      {searchResult ? (
        searchResult
          .filter((result) => result.description && result.source && result.author && result.urlToImage)
          .map((result, index) => (
          <View key={index} style={styles.resultContainer} onTouchEnd={() => navigation.navigate('NewsDetail', { article: result })}>
            {result.urlToImage ? (
                <Image source={{ uri: result.urlToImage }} style={styles.resultImage} />
              ) : (
                <View style={styles.placeholderImageContainer}>
                  <Image source={require('../assets/Images/NewsWave.png')} style={styles.resultImage} />
                </View>
              )}
            <Text style={styles.resultTitle}>{result.title}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noResultsText}>No search results found.</Text>
      )}
        </>
      ) : (
        <SkeletonLoader />
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  resultContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultImage: {
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  resultTitle: {
    flex: 1,
    color: '#000',
    fontSize: 15,
    marginTop: 5,
    marginHorizontal: 10,
    fontWeight: '500',
    textAlign: 'justify'
  },
  noResultsText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    height: 65,
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#f7f7f7',
  },
  img: {
    height: 55,
    width: 55,
  },
  headerText: {
    color: '#000',
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  codeIcon: {
    marginHorizontal: 8,
  },
  search:{
    margin: 10
  },
  searchtxt:{
    color: '#000',
    fontSize: 14
  },
  skeletonContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  skeletonHeader: {
    backgroundColor: '#f0f0f0',
    height: 65,
    marginBottom: 10,
    width: '100%'
  },
  skeletonSearch: {
    backgroundColor: '#f0f0f0',
    height: 50,
    marginBottom: 10,
    width: '80%',
    marginLeft: 5
  },
  skeletonCategories: {
    backgroundColor: '#f0f0f0',
    height: 40,
    width: 130,
    marginBottom: 10,
    width: '100%'
  },
  skeletonHeadlines: {
    backgroundColor: '#f0f0f0',
    height: 40,
    marginBottom: 10,
    width: '100%'
  },
  skeletonArticleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  skeletonArticleImage: {
    backgroundColor: '#f0f0f0',
    height: 100,
    width: 100,
    marginRight: 10,
  },
  skeletonArticleText: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    height: 100,
  },
  placeholderImageContainer: {
    backgroundColor: '#f0f0f0',
    height: 100,
    width: '100%',
    borderRadius: 10,
  },
});

export default SearchResult;
