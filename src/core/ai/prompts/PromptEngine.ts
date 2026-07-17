export interface PromptVersion {
  versionId: string;
  template: string;
  createdAt: number;
  author: string;
}

export class PromptEngine {
  private templates: Map<string, PromptVersion[]> = new Map();

  registerTemplate(name: string, template: PromptVersion) {
    if (!this.templates.has(name)) {
      this.templates.set(name, []);
    }
    this.templates.get(name)!.push(template);
  }

  assemblePrompt(templateName: string, context: Record<string, any>, versionId?: string): string {
    const versions = this.templates.get(templateName);
    if (!versions || versions.length === 0) throw new Error(`Template ${templateName} not found`);
    
    const targetVersion = versionId 
      ? versions.find(v => v.versionId === versionId) 
      : versions[versions.length - 1]; // latest
      
    if (!targetVersion) throw new Error(`Version ${versionId} not found`);

    let promptStr = targetVersion.template;
    for (const [key, value] of Object.entries(context)) {
      promptStr = promptStr.replace(`{{${key}}}`, JSON.stringify(value));
    }
    return promptStr;
  }
}
