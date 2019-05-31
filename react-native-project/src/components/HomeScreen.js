import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, Dimensions, Slider, Modal, Linking, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import TableRow from './TableRow';
import NormalInput from './NormalInput';

const SCREEN_WIDTH = Dimensions.get('window').width;


export default class HomeScreen extends Component{
  state = {
    model: '',
    weight: 3.5,
    weightString: '2 – 4',
    length: 8.5,
    width: 3.3,
    avgift: 800,
    modal: false,
    name: '',
    email: '',
    gata: '',
    telefon: '',
    post: ''
  };

  updateWeight (weight){
    weight = parseFloat(weight.toFixed(0));
    let weightString;
    if(weight < 2) {
      weightString = '0 - 2';
    } else if(weight < 4) {
      weightString = '2 - 4';
    } else if(weight < 6) {
      weightString = '4 - 6';
    } else if(weight < 8) {
      weightString = '6 - 8';
    } else if(weight < 10) {
      weightString = '8 - 10';
    } else if(weight < 12) {
      weightString = '10 - 12';
    } else if(weight < 14) {
      weightString = '12 - 14';
    } else if(weight < 16) {
      weightString = '14 - 16';
    } else if(weight < 18) {
      weightString = '16 - 18';
    } else if(weight < 20) {
      weightString = '18 - 20';
    } else if (weight > 19.9 ) {
      weightString = '20+'
    }

    this.setState({ weight, weightString });
  }

  updateLength(length) {
    length = length.toFixed(1);
    this.setState({ length: parseFloat(length) });
  }

  updateWidth(width) {
    width = width.toFixed(1);
    this.setState({ width: parseFloat(width) });
  }

  calcSpaceCost(cost) {
    cost = this.state.length * (this.state.width + 0.5) * cost;
    return cost.toFixed(0);
  }

  calcSpace() {
    let space = this.state.length * (this.state.width + 0.5);
    return space.toFixed(1);
  }

  calcHantering() {
    if(this.state.weight < 2) {
			return 1800;
		} else if(this.state.weight < 4) {
			return 3100;
		} else if (this.state.weight < 6) {
			return 3600;
		} else if(this.state.weight < 8) {
			return 5400;
		} else if (this.state.weight < 10) {
			return 7000;
		} else if(this.state.weight < 12) {
			return 7800;
		} else if (this.state.weight < 14) {
			return 86000;
		} else if(this.state.weight < 16) {
			return 10000;
		} else if (this.state.weight < 18) {
			return 10800;
		} else if(this.state.weight < 20) {
			return 11600;
		} else if (this.state.weight < 30) {
			return 12000; //KOLLA UPP
		}
		return 0;
  }

  //Format prices eg. 10000 -> 10 000
	formatPrice(price) {
		let p = price.toString();
		if(price > 999) {
			if(price > 9999) {
				if(price > 99999) {
					return p.slice(0, 3) + " " + p.slice(3);
				} else {
					return p.slice(0, 2) + " " + p.slice(2);
				}
			} else {
				return p.slice(0, 1) + " " + p.slice(1);
			}
		}
		return p;
	}

  calcSum(cost) {
    let hej = this.state.avgift + parseFloat(this.calcSpaceCost(cost)) + this.calcHantering();
    return hej;
  }

  calculateArea() {
    let area = this.state.length*(this.state.width+0.5);
    return area.toFixed(2);
  }

  skickaOffert() {
    const body =
`Namn:
Telefonnummer:
Email:
Adress:
Postnummer:
Ort:
Övrig information:

Båtmodell: ${this.state.model}
Längd: ${this.state.length} meter (Inkl. ankare, peke osv.)
Bredd: ${this.state.width} meter
Vikt: ${this.state.weightString} ton
Yta (inkl. serviceyta): ${this.state.length*(this.state.width+0.5)} m²

Miljöavgift: ${this.state.avgift}
Hanteringkostnad: ${this.formatPrice(this.calcHantering())}
Totalt pris inomhus: ${this.formatPrice(this.calcSum(750))}
Totalt pris utommhus: ${this.formatPrice(this.calcSum(350))}
`;
    Linking.openURL(`mailto:micke@grebbestadvarv.com?subject=Offert vinterförvaring&body=${body}`);
  }

  render () {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modal}
          onRequestClose={() => {
            this.setState({ modal: false });
          }}>
          <ScrollView style={{marginTop: 40, padding: 20, flex: 1}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#16216a', textAlign: 'center' }}>Specifikation {"\n"}</Text>
            <Text>*Inklusive 0.5m serviceyta på bredden</Text>
            <Text>*Inklusive moms</Text>
            <Text>*Varmhall: inomhus, 750 SEK/m2</Text>
            <Text>*Inhägnat område: utomhus, 350 SEK/m2 {"\n\n"}</Text>
            <TableRow
              label={`Hanteringkostnad (${this.state.weightString} ton)`}
              data={this.formatPrice(this.calcHantering())}
            />
            <TableRow
              label='Miljöavgift'
              data={this.formatPrice(this.state.avgift)}
            />
            <Text></Text>
            <TableRow
              label={`Varmhall(${this.calculateArea()} m²)`}
              data={this.formatPrice(this.calcSpaceCost(750))}
            />
            <TableRow
              label='Summa'
              data={`${this.formatPrice(this.calcSum(750))} SEK`}
              fontWeight='bold'
            />
            <Text></Text>
            <TableRow
              label={`Inhägnat område (${this.calculateArea()} m²)`}
              data={this.formatPrice(this.calcSpaceCost(350))}
            />
            <TableRow
              label='Summa'
              data={`${this.formatPrice(this.calcSum(350))} SEK`}
              fontWeight='bold'
            />
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 30, marginBottom: 0 }}>
              <View style={{ flex: 1, margin: 5, height: 40, borderRadius: 8 }}>
                <Button
                  buttonStyle={{ backgroundColor: '#000' }}
                  title='Gå tillbaka'
                  onPress={() => this.setState({ modal: false })}
                />
              </View>
              <View style={{ flex: 1, margin: 5, height: 40, borderRadius: 8, backgroundColor: 'black' }}>
                <Button
                  buttonStyle={{ backgroundColor: '#16216a' }}
                  onPress={() => this.skickaOffert()}
                  title="Skicka offert"
                />
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 10 }}>
              <Text style={{ fontSize: 12 }}>*Detta är endast en prisindikation.
  För mindre båtar (under 7 meter) stämmer inte kalkylen. Fyll i uppgifterna så sanningsenligt som möjligt och tryck på skicka offert, så återkommer vi med en giltig offert.
  Skriv gärna i mailet om det är utomhus eller inomhus ni önskar ha er båt.</Text>
            </View>
          </ScrollView>
        </Modal>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#16216a', textAlign: 'center' }}>Beräkna vinterförvaring {"\n"}</Text>
        <NormalInput
          label='Båtmodell'
          onChange={(model) => this.setState({ model })}
          focused={true}
        />
        <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={styles.label}>Totallängd: {this.state.length}m</Text>
            <Text style={{ fontSize: 10 }}>(Inkl. ankare, peke osv.)</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => this.updateLength(this.state.length-0.1)}
                >
                  <Icon
                    name='remove-circle'
                    color='#16216a'
                    size={40}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 5, justifyContent: 'center' }}>
                <Slider
                  minimumTrackTintColor='#16216a'
                  style={styles.input, { borderWeight: 0 }}
                  maximumValue={20}
                  minimumValue={1}
                  value={this.state.length}
                  onValueChange={(value) => this.updateLength(value)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => this.updateLength(this.state.length+0.1)}
                >
                  <Icon
                    name='add-circle'
                    color='#16216a'
                    size={40}
                  />
                </TouchableOpacity>
              </View>
            </View>
        </View>
        <View style={{ flex: 1, marginTop: 15 }}>
            <Text style={styles.label}>Bredd: {this.state.width}m</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => this.updateWidth(this.state.width-0.1)}
                >
                  <Icon
                    name='remove-circle'
                    color='#16216a'
                    size={40}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 5, justifyContent: 'center' }}>
                <Slider
                  minimumTrackTintColor='#16216a'
                  style={styles.input, { borderWeight: 0 }}
                  maximumValue={10}
                  minimumValue={1}
                  value={this.state.width}
                  onValueChange={(value) => this.updateWidth(value)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => this.updateWidth(this.state.width+0.1)}
                >
                  <Icon
                    name='add-circle'
                    color='#16216a'
                    size={40}
                  />
                </TouchableOpacity>
              </View>
            </View>
        </View>
        <View style={{ flex: 1, marginTop: 15, marginBottom: 10 }}>
          <Text style={styles.label}>Vikt: {this.state.weightString} ton</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => this.updateWeight(this.state.weight-2)}
              >
                <Icon
                  name='remove-circle'
                  color='#16216a'
                  size={40}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 5, justifyContent: 'center' }}>
              <Slider
                minimumTrackTintColor='#16216a'
                style={styles.input, { borderWeight: 0 }}
                maximumValue={20}
                minimumValue={1}
                value={this.state.weight}
                onValueChange={(value) => this.updateWeight(value)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => this.updateWeight(this.state.weight+2)}
              >
                <Icon
                  name='add-circle'
                  color='#16216a'
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <NormalInput
          label='Miljöavgift'
          onChange={(avgift) => {
            if(avgift !== "") {
              this.setState({ avgift: parseInt(avgift) });
            } else {
              this.setState({ avgift: 0 });
            }
          }}
          keyboardType='numeric'
          value={this.state.avgift.toString()}
        />
        <View style={{ marginTop: 20}}>
          <Button
            buttonStyle={{ backgroundColor: '#16216a' }}
            color= '#16216a'
            title='Beräkna'
            onPress={() => this.setState({ modal: true })}
          />
        </View>
      </View>
    );
  }
}

styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  input: {
    height: 35,
    width: SCREEN_WIDTH - 20,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 3
  }
}
