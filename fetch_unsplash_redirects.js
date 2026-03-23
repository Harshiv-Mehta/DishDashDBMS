const https = require('https');
const fs = require('fs');

const items = [
  {"name":"Veg Biryani","url":"https://source.unsplash.com/400x300/?veg-biryani"},
  {"name":"Mutton Biryani","url":"https://source.unsplash.com/400x300/?mutton-biryani"},
  {"name":"Chicken Biryani","url":"https://source.unsplash.com/400x300/?chicken-biryani"},
  {"name":"Sajuk Tup Mutton Biryani","url":"https://source.unsplash.com/400x300/?mutton-biryani"},
  {"name":"Chicken Dum Biryani","url":"https://source.unsplash.com/400x300/?chicken-dum-biryani"},
  {"name":"Mutton Thali Biryani","url":"https://source.unsplash.com/400x300/?mutton-biryani"},
  {"name":"Hyderabadi Chicken Biryani","url":"https://source.unsplash.com/400x300/?hyderabadi-biryani"},
  {"name":"Saffron Biryani","url":"https://source.unsplash.com/400x300/?saffron-biryani"},
  {"name":"Egg Biryani","url":"https://source.unsplash.com/400x300/?egg-biryani"},
  {"name":"Zaikedaar Chicken Biryani","url":"https://source.unsplash.com/400x300/?chicken-biryani"},
  {"name":"Special Mutton Biryani","url":"https://source.unsplash.com/400x300/?mutton-biryani"},
  {"name":"Paneer Biryani","url":"https://source.unsplash.com/400x300/?paneer-biryani"},

  {"name":"Butter Chicken","url":"https://source.unsplash.com/400x300/?butter-chicken"},
  {"name":"Paneer Makhanwala","url":"https://source.unsplash.com/400x300/?paneer-curry"},
  {"name":"Thali Special Bhaji","url":"https://source.unsplash.com/400x300/?indian-thali"},
  {"name":"Paneer Paratha","url":"https://source.unsplash.com/400x300/?paneer-paratha"},
  {"name":"Paneer Lababdar","url":"https://source.unsplash.com/400x300/?paneer-curry"},
  {"name":"Chicken Tikka Masala","url":"https://source.unsplash.com/400x300/?chicken-tikka-masala"},
  {"name":"Dal Maharaja","url":"https://source.unsplash.com/400x300/?dal"},
  {"name":"Veg Kadhai","url":"https://source.unsplash.com/400x300/?veg-curry"},
  {"name":"Curry Bowl","url":"https://source.unsplash.com/400x300/?curry"},
  {"name":"Murg Makhani","url":"https://source.unsplash.com/400x300/?butter-chicken"},
  {"name":"Paneer Tikka Masala","url":"https://source.unsplash.com/400x300/?paneer-tikka-masala"},
  {"name":"Special Dal","url":"https://source.unsplash.com/400x300/?dal"},
  {"name":"Veg Platter","url":"https://source.unsplash.com/400x300/?veg-platter"},
  {"name":"Green Curry","url":"https://source.unsplash.com/400x300/?green-curry"},
  {"name":"Veg Masala","url":"https://source.unsplash.com/400x300/?veg-curry"},

  {"name":"Margherita Pizza","url":"https://source.unsplash.com/400x300/?margherita-pizza"},
  {"name":"Gourmet Pizza","url":"https://source.unsplash.com/400x300/?gourmet-pizza"},
  {"name":"BBQ Chicken Pizza","url":"https://source.unsplash.com/400x300/?bbq-chicken-pizza"},
  {"name":"Pepperoni Pizza","url":"https://source.unsplash.com/400x300/?pepperoni-pizza"},
  {"name":"Veg Delight Pizza","url":"https://source.unsplash.com/400x300/?veg-pizza"},
  {"name":"Chicken Supreme Pizza","url":"https://source.unsplash.com/400x300/?chicken-pizza"},
  {"name":"Special Pizza","url":"https://source.unsplash.com/400x300/?pizza"},
  {"name":"Classic Pizza","url":"https://source.unsplash.com/400x300/?classic-pizza"},
  {"name":"Paneer Pizza","url":"https://source.unsplash.com/400x300/?paneer-pizza"},
  {"name":"Chicken Pizza","url":"https://source.unsplash.com/400x300/?chicken-pizza"},
  {"name":"Veggie Feast Pizza","url":"https://source.unsplash.com/400x300/?veg-pizza"},
  {"name":"Meaty Feast Pizza","url":"https://source.unsplash.com/400x300/?meat-pizza"},
  {"name":"Maharaja Pizza","url":"https://source.unsplash.com/400x300/?pizza"},
  {"name":"Pan Pizza","url":"https://source.unsplash.com/400x300/?pan-pizza"},
  {"name":"Farmhouse Pizza","url":"https://source.unsplash.com/400x300/?farmhouse-pizza"},

  {"name":"Special Vada Pav","url":"https://source.unsplash.com/400x300/?vada-pav"},
  {"name":"Spicy Vada Pav","url":"https://source.unsplash.com/400x300/?vada-pav"},
  {"name":"Special Burger","url":"https://source.unsplash.com/400x300/?burger"},
  {"name":"Special Mixed Bhel","url":"https://source.unsplash.com/400x300/?bhel-puri"},
  {"name":"Pani Puri Plate","url":"https://source.unsplash.com/400x300/?pani-puri"},
  {"name":"Chicken Sandwich","url":"https://source.unsplash.com/400x300/?chicken-sandwich"},
  {"name":"Bun Maska","url":"https://source.unsplash.com/400x300/?bun-maska"},
  {"name":"Special Misal Pav","url":"https://source.unsplash.com/400x300/?misal-pav"},
  {"name":"Spicy Misal Pav","url":"https://source.unsplash.com/400x300/?misal-pav"},
  {"name":"Mango Milkshake","url":"https://source.unsplash.com/400x300/?mango-milkshake"},
  {"name":"Chicken Roll","url":"https://source.unsplash.com/400x300/?chicken-roll"},
  {"name":"Special Roll","url":"https://source.unsplash.com/400x300/?kathi-roll"},
  {"name":"Veg Maharaja Mac","url":"https://source.unsplash.com/400x300/?burger"},
  {"name":"Shiv Kailash Lassi","url":"https://source.unsplash.com/400x300/?lassi"},
  {"name":"Special Misal","url":"https://source.unsplash.com/400x300/?misal"},

  {"name":"Hakka Noodles","url":"https://source.unsplash.com/400x300/?hakka-noodles"},
  {"name":"Dimsums Platter","url":"https://source.unsplash.com/400x300/?dumplings"},
  {"name":"Chicken Fried Rice","url":"https://source.unsplash.com/400x300/?fried-rice"},
  {"name":"Pan Asian Stir Fry","url":"https://source.unsplash.com/400x300/?stir-fry"},
  {"name":"Special Ramen","url":"https://source.unsplash.com/400x300/?ramen"},
  {"name":"Poke Bowl","url":"https://source.unsplash.com/400x300/?poke-bowl"},
  {"name":"Special Dumplings","url":"https://source.unsplash.com/400x300/?dumplings"},
  {"name":"Special Tempura","url":"https://source.unsplash.com/400x300/?tempura"},
  {"name":"Sushi Platter","url":"https://source.unsplash.com/400x300/?sushi"},
  {"name":"Special Manchurian","url":"https://source.unsplash.com/400x300/?manchurian"},
  {"name":"Oriental Stir Fry","url":"https://source.unsplash.com/400x300/?stir-fry"},
  {"name":"Asian Wings","url":"https://source.unsplash.com/400x300/?chicken-wings"},
  {"name":"Pan Asian","url":"https://source.unsplash.com/400x300/?asian-food"},
  {"name":"Veg Spring Rolls","url":"https://source.unsplash.com/400x300/?spring-rolls"},
  {"name":"Chicken Noodles","url":"https://source.unsplash.com/400x300/?chicken-noodles"},

  {"name":"Mysore Masala Dosa","url":"https://source.unsplash.com/400x300/?masala-dosa"},
  {"name":"Special Idli Sambar","url":"https://source.unsplash.com/400x300/?idli-sambar"},
  {"name":"Special Podi Idli","url":"https://source.unsplash.com/400x300/?idli"},
  {"name":"Maharashtrian Thali","url":"https://source.unsplash.com/400x300/?maharashtrian-thali"},
  {"name":"Special Paper Dosa","url":"https://source.unsplash.com/400x300/?dosa"},
  {"name":"Special Medu Vada","url":"https://source.unsplash.com/400x300/?medu-vada"},
  {"name":"Steamed Idli","url":"https://source.unsplash.com/400x300/?idli"},
  {"name":"Special Bisibelebath","url":"https://source.unsplash.com/400x300/?bisi-bele-bath"},
  {"name":"Benne Dosa Special","url":"https://source.unsplash.com/400x300/?dosa"},
  {"name":"Famous Cold Coffee","url":"https://source.unsplash.com/400x300/?cold-coffee"},
  {"name":"South Indian Thali","url":"https://source.unsplash.com/400x300/?south-indian-thali"},
  {"name":"Special Uttapam","url":"https://source.unsplash.com/400x300/?uttapam"},
  {"name":"Special Masala Dosa","url":"https://source.unsplash.com/400x300/?masala-dosa"},

  {"name":"Mawa Cake","url":"https://source.unsplash.com/400x300/?mawa-cake"},
  {"name":"Mango Mastani","url":"https://source.unsplash.com/400x300/?mango-mastani"},
  {"name":"Ginger Biscuits","url":"https://source.unsplash.com/400x300/?biscuits"},
  {"name":"Gulab Jamun","url":"https://source.unsplash.com/400x300/?gulab-jamun"},
  {"name":"Kaju Katli","url":"https://source.unsplash.com/400x300/?kaju-katli"},
  {"name":"Special Puffs","url":"https://source.unsplash.com/400x300/?puffs"},
  {"name":"Cheesecake","url":"https://source.unsplash.com/400x300/?cheesecake"},
  {"name":"Cupcakes","url":"https://source.unsplash.com/400x300/?cupcakes"},
  {"name":"Chocolate Brownie","url":"https://source.unsplash.com/400x300/?brownie"},
  {"name":"Special Tart","url":"https://source.unsplash.com/400x300/?tart"},
  {"name":"Organic Desserts","url":"https://source.unsplash.com/400x300/?desserts"},
  {"name":"Artisan Pastries","url":"https://source.unsplash.com/400x300/?pastries"},
  {"name":"Macarons","url":"https://source.unsplash.com/400x300/?macarons"},
  {"name":"Ice Cream","url":"https://source.unsplash.com/400x300/?ice-cream"},
  {"name":"Rasgulla Plate","url":"https://source.unsplash.com/400x300/?rasgulla"},

  {"name":"Paneer Tikka","url":"https://source.unsplash.com/400x300/?paneer-tikka"},
  {"name":"Chicken Tikka","url":"https://source.unsplash.com/400x300/?chicken-tikka"},
  {"name":"Reshmi Kabab","url":"https://source.unsplash.com/400x300/?kebab"},
  {"name":"Mutton Seekh Kabab","url":"https://source.unsplash.com/400x300/?seekh-kebab"},
  {"name":"Galouti Kabab","url":"https://source.unsplash.com/400x300/?kebab"},
  {"name":"Lotus Stem","url":"https://source.unsplash.com/400x300/?lotus-stem-food"},
  {"name":"Wings","url":"https://source.unsplash.com/400x300/?chicken-wings"},
  {"name":"Loaded Nachos","url":"https://source.unsplash.com/400x300/?nachos"},
  {"name":"Mezze Platter","url":"https://source.unsplash.com/400x300/?mezze"},
  {"name":"Hara Bhara Kabab","url":"https://source.unsplash.com/400x300/?veg-kebab"},
  {"name":"Special Galouti","url":"https://source.unsplash.com/400x300/?kebab"},
  {"name":"Special Starters","url":"https://source.unsplash.com/400x300/?starters-food"},
  {"name":"Sushi","url":"https://source.unsplash.com/400x300/?sushi"},
  {"name":"Bao","url":"https://source.unsplash.com/400x300/?bao-buns"},
  {"name":"Paneer Sizzler","url":"https://source.unsplash.com/400x300/?sizzler"}
];

function fetchRedirect(sourceUrl) {
    return new Promise((resolve) => {
        https.get(sourceUrl, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                let location = res.headers.location;
                if (location.includes('?')) {
                    resolve(location.split('?')[0] + '?w=800&q=80');
                } else {
                    resolve(location + '?w=800&q=80');
                }
            } else {
                resolve('https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80'); // fallback
            }
        }).on('error', () => resolve('https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80'));
    });
}

async function run() {
    const results = {};
    for (let item of items) {
        const staticUrl = await fetchRedirect(item.url);
        results[item.name.toLowerCase()] = staticUrl;
    }
    fs.writeFileSync('resolved_urls_utf8.txt', JSON.stringify(results, null, 4), 'utf8');
    process.exit(0);
}

run();
