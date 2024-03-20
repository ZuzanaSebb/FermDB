import pandas as pd 


df = pd.read_excel('Fermented_food2.xlsx')
df.columns = df.columns.str.replace(' ', '_') 
df = df[
     ['Country',
      'Category',
      'Product'
     ]
]
df['Country'] = df['Country'].apply(lambda x : str(x).split(','))


flatdata_ontology = pd.DataFrame([( index, value) for ( index, values) 
                         in df[ 'Country' ].items() for value in values], 
                             columns = [ 'index', 'Country']).set_index( 'index' ) 
  
df = df.drop( 'Country', axis = 1 ).join( flatdata_ontology) 
df['Country'] = df['Country'].apply(lambda x : x.strip())
df['Category'] = df['Category'].fillna('other')

df.to_csv('Map_category.csv',sep = ',')

level0 = df.groupby(['Country'], group_keys=True
                ).sum().reset_index(['Country'])
level0['combined']= level0['Country'] 

level1 = df.groupby(['Country','Category'], group_keys=True
                ).sum().reset_index(['Country','Category'])
level1['combined']= level1['Country'] + '.' + level1['Category']

level2 = df.groupby(['Country','Category','Product'], group_keys=True
                ).sum().reset_index(['Country','Category','Product'])
level2['combined']= level2['Country'] + '.' + level2['Category'] + '.' + level2['Product']


df_res = pd.concat([level0['combined'],level1['combined'],level2['combined']])
df_res.to_csv('DendrogramData.csv',sep = ',')