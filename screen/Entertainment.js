import { StyleSheet, Text, View,ScrollView,Image,TouchableOpacity } from 'react-native'
import React ,{useEffect,useState} from 'react'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function Entertainment({navigation}) {
    const [headlines, setHeadlines] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetchNewsHeadlines()
        .then(() => {
          setIsLoading(false);
        });
    }, []);
  
    const fetchNewsHeadlines = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=cc7fcf60d59944aaa8984902b3e1030b');
        const data = await response.json();
  
        if (data.status === 'ok') {
          setHeadlines(data.articles);
        } else {
          console.error('Failed to fetch headlines:', data.message);
        }
      } catch (error) {
        console.error('Error fetching headlines:', error);
      }
    };
  
    const SkeletonLoader = () => {
      return (
        <View style={styles.skeletonContainer}>
          <ShimmerPlaceholder
            autoRun={true}
            visible={false}
            style={styles.skeletonHeader}
          />
          <ShimmerPlaceholder
            autoRun={true}
            visible={false}
            style={styles.skeletonHeadlines}
          />
          <ScrollView>
            {[...Array(7).keys()].map((index) => (
              <View key={index} style={styles.skeletonArticleContainer}>
                <ShimmerPlaceholder
                  autoRun={true}
                  visible={false}
                  style={styles.skeletonArticleImage}
                />
                <ShimmerPlaceholder
                  autoRun={true}
                  visible={false}
                  style={styles.skeletonArticleText}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      );
    };
  
  
    return (
      <View style={styles.container}>
        {!isLoading ? (
          <>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image source={require('../assets/Images/NewsWaveLogo.png')} style={styles.img}/>
            </TouchableOpacity>
              <Text style={styles.headerText}>News Wave</Text>
              <FontAwesome5 name="code" size={20} color="#000" solid style={styles.codeIcon} onPress={() => navigation.navigate('Developer')}/>
            </View>
            <View style={styles.searchContainer}>
            </View>
            
            <View style={styles.newshead}>
              <Text style={styles.sectiontxt}>Entertainment</Text>
            </View>
            <ScrollView>
            {headlines
                .filter((article) => article.description && article.source && article.author && article.urlToImage)
                .map((article, index) => (
                <View key={index} style={styles.articleContainer} onTouchEnd={() => navigation.navigate('NewsDetail', { article })}>
                {article.urlToImage ? (
                    <Image source={{ uri: article.urlToImage }} style={styles.articleImage} />
                ) : (
                    <View style={styles.placeholderImageContainer}>
                    <Image source={require('../assets/Images/NewsWave.png')} style={styles.articleImage} />
                    </View>
                )}
                <View style={styles.txtcontainer}>
                    {article.title && (
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    )}
                    {article.source && article.source.name && (
                    <Text style={styles.articleSource}>{article.source.name}</Text>
                    )}
                </View>
                </View>
  ))}
  
            </ScrollView>
          </>
        ) : (
          <SkeletonLoader/>
        )}
  
      </View>
    );
  }
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    searchContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 20,
    },
    input: {
      flex: 1,
      padding: 12,
      height: 50,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#000',
      color: '#000',
      backgroundColor: '#f7f7f7',
    },
    inputIcon: {
      backgroundColor: '#000',
      borderRadius: 10,
      height: 45,
      width: 45,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },
    categoriesContainer: {
      marginVertical: 10,
    },
    categories: {
      flexDirection: 'row',
    },
    ctg: {
      backgroundColor: '#f7f7f7',
      height: 40,
      width: 130,
      paddingHorizontal: 10,
      justifyContent: 'center',
      marginHorizontal: 5,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: 18
    },
    ctgtxt: {
      color: '#000',
      textAlign: 'center',
    },
    newshead: {
      marginLeft: 20,
      marginVertical: 10,
    },
    sectiontxt: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
    },
    headlinecontainer:{
      marginTop: 10
    },
    articleContainer: {
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
    articleImage: {
      height: 100,
      width: 100,
      borderRadius: 5,
    },
    txtcontainer:{
      flex: 1,
      flexDirection: 'column'
    },
    articleTitle: {
      flex: 1,
      color: '#000',
      fontSize: 15,
      marginTop: 5,
      marginHorizontal: 10,
      fontWeight: '500',
      textAlign: 'justify'
    },
    articleSource:{
      fontSize: 10,
      color: '#000',
      marginHorizontal: 10,
    },
    skeletonContainer: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    skeletonHeader: {
      backgroundColor: '#f0f0f0',
      height: 65,
      width: '100%',
      marginBottom: 10,
    },
    
    skeletonHeadlines: {
      backgroundColor: '#f0f0f0',
      height: 40,
      width: '100%',
      marginBottom: 10,
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
  