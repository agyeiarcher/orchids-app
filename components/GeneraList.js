// components/GeneraList.js
import { useState } from 'react';

function GeneraList({ genera }) {
  const [selectedGenus, setSelectedGenus] = useState(null);

  const isHybrid = (genus) => {
    return genus.Parent1 && genus.Parent2;
  };

  const getAllParents = (genus) => {
    let parents = [];
    for (let i = 1; i <= 10; i++) {
      if (genus[`Parent${i}`]) {
        parents.push(genus[`Parent${i}`]);
      }
    }
    return parents;
  };

const getPotentialHybridsForNatural = (genusName) => {
    return genera
      .filter(g => (g.Parent1 === genusName || g.Parent2 === genusName) && g.Hybrid_Genus !== genusName) // Modified this line
      .map(hybrid => {
        const allParents = getAllParents(hybrid);
        const otherParents = allParents.filter(parent => parent !== genusName);
        return {
          ...hybrid,
          otherParents: otherParents
        };
      });
};

  return (
    <div>
      {genera.map((genus) => (
        <div key={genus.Hybrid_Genus} className="my-2">
          <span onClick={() => setSelectedGenus(selectedGenus !== genus ? genus : null)}>
            {isHybrid(genus) ? "🔗" : "🌱"} {genus.Hybrid_Genus}
          </span>

          {selectedGenus === genus && (
            <div>
              {isHybrid(genus) ? (
                <>
                  <div>Hybrid orchid: {getAllParents(genus).join(", ")}</div>
                </>
              ) : (
                <>
                  <div>Natural genus. Possible combinations:</div>
                  {getPotentialHybridsForNatural(genus.Hybrid_Genus).map(hybrid => (
                    <div key={hybrid.Hybrid_Genus}>
                      {hybrid.Hybrid_Genus} with {hybrid.otherParents.join(', ')}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default GeneraList;
