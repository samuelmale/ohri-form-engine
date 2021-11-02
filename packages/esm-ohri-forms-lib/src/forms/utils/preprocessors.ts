
/**
 * Function parses JSON form input and updates validation behaviours according to a given intent
 *
 * @param {string} intent The specified intent
 * @param {object} originalJson The original JSON form schema object
 * @returns {object} The form json
 */
 export function updateRequiredBehaviourByItent(intent, originalJson) {
    // Deep-copy original JSON
    const jsonBuffer = JSON.parse(JSON.stringify(originalJson));
  
    // Traverse the property tree with items of interest for validation
    jsonBuffer.pages.forEach(page => {
      page.sections.forEach(section => {
        section.questions.forEach(question => {
          if (question.behaviours) {
            // Check if question behaviours includes required intent
            const requiredIntentBehaviours = question.behaviours?.find(behaviour => behaviour.intent === intent);
  
            // If required intent is present, substitute original props
            if (requiredIntentBehaviours) {
              question.required = requiredIntentBehaviours.required || undefined;
              question.unspecified = requiredIntentBehaviours.unspecified || undefined;
              question.hide = requiredIntentBehaviours.hide || undefined;
              question.validators = requiredIntentBehaviours.validators || undefined;
            } else {
              // Attempt to retrieve default behaviours
              const defaultIntentBehaviours = question.behaviours.find(behaviour => behaviour.intent === '*');
              if (defaultIntentBehaviours) {
                question.required = defaultIntentBehaviours.required || undefined;
                question.unspecified = defaultIntentBehaviours.unsepecified || undefined;
                question.hide = defaultIntentBehaviours.hide || undefined;
                question.validators = defaultIntentBehaviours.validators || undefined;
              }
            }
  
            // make sure behaviours prop is always deleted
            if (question.behaviours) {
              delete question.behaviours;
            }
          }
        });
      });
    });
  
    // Return constructed Json based on intent validation
    return jsonBuffer;
  }